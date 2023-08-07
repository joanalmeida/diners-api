import { PrismaClient, Product as DBProduct } from '@prisma/client';
import { IProductRepository } from './application/port/out/productRepository.interface';
import { Product } from './application/domain/product';
import { ProductQuery } from './application/domain/product.types';

export class DBProductRepository implements IProductRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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

  async getProducts(search: ProductQuery): Promise<Product[]> {
    const prismaQuery = this.buildPrismaQuery(search);
    const dbProducts: DBProduct[] = await this.prisma.product.findMany({
      where: prismaQuery,
    });
    const products: Product[] = dbProducts.map(this.fromDBProduct);

    return products;
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
      if (operator) {
        if (operator === ':') {
          prismaQuery = {
            ...prismaQuery,
            [key]: {
              equals: productQuery[key as keyof ProductQuery]?.value,
              mode: 'insensitive',
            }
          };
        } else if (operator === '*') {
          prismaQuery = {
            ...prismaQuery,
            [key]: {
              contains: productQuery[key as keyof ProductQuery]?.value,
              mode: 'insensitive',
            },
          };
        } else {
          throw new Error(
            `Operator ${operator} not recognized for field ${key}.`,
          );
        }
      }
    });

    return prismaQuery;
  }
}
