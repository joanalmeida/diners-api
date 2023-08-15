import { PrismaClient, Product as DBProduct } from '@prisma/client';
import { IProductRepository } from './application/port/out/productRepository.interface';
import { Product } from './application/domain/product';
import { Operator, ProductQuery } from './application/domain/product.types';

export class DBProductRepository implements IProductRepository {
  prisma: PrismaClient;
  operatorMap: Map<
    Operator,
    (
      key: string,
      value: string | number | undefined,
    ) => {
      [x: string]: { [x: string]: string | number | undefined; mode?: string };
    }
  >;

  constructor() {
    this.prisma = new PrismaClient();
    this.operatorMap = new Map();
    this.operatorMap.set(':', this.buildPrismaQueryObject('equals'));
    this.operatorMap.set('*', this.buildPrismaQueryObject('contains'));
  }

  async getById(productId: string): Promise<Product> {
    try {
      const product: DBProduct = await this.prisma.product.findUniqueOrThrow({
        where: {
          id: productId,
        },
      });

      return this.fromDBProduct(product);
    } catch (error) {
      if ((error.code = 'P2025')) {
        throw new Error(`Did not find product with id ${productId}`);
      } else {
        console.error(error);
        throw new Error('Something reaaaally bad happened');
      }
    }
  }

  //TODO: revisar si hay que wrappear entre try/catch para devolver array vacio
  async getProducts(search: ProductQuery): Promise<Product[]> {
    const prismaQuery = this.buildPrismaQuery(search);
    const dbProducts: DBProduct[] = await this.prisma.product.findMany({
      where: prismaQuery,
    });
    const products: Product[] = dbProducts.map(this.fromDBProduct);

    return products;
  }

  async deleteById(productId: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      if ((error.code = 'P2025')) {
        throw new Error(`Did not find product with id ${productId}`);
      } else {
        console.error(error);
        throw new Error('Something reaaaally bad happened');
      }
    }
  }

  fromDBProduct(dbProduct: DBProduct): Product {
    return new Product(
      dbProduct.id,
      dbProduct.dinerId,
      dbProduct.name,
      dbProduct.description,
      dbProduct.price,
      dbProduct.state,
    );
  }

  buildPrismaQuery(productQuery: ProductQuery): any {
    let prismaQuery = {};

    Object.keys(productQuery).forEach((key) => {
      const operator = productQuery[key as keyof ProductQuery]?.operator;
      if (!operator) {
        throw new Error(
          `Operator ${operator} not recognized for field ${key}.`,
        );
      }

      const operatorQueryFn = this.operatorMap.get(operator);
      if (!operatorQueryFn) {
        throw new Error(
          `Operator ${operator} is not available on operator map.`,
        );
      }

      const queryObject = operatorQueryFn(
        key,
        productQuery[key as keyof ProductQuery]?.value,
      );

      prismaQuery = {
        ...prismaQuery,
        ...queryObject,
      };
    });

    return prismaQuery;
  }

  buildPrismaQueryObject(param: 'equals' | 'contains') {
    return (key: string, value: string | number | undefined) => {
      const queryObject = {
        [key]: {
          [param]: value,
        },
      };

      if (typeof value === 'string') {
        queryObject[key] = {
          ...queryObject[key],
          mode: 'insensitive',
        };
      }

      return queryObject;
    };
  }
}
