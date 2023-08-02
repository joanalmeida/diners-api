import { PrismaClient, Product as DBProduct } from '@prisma/client';
import { IProductRepository } from './application/port/out/productRepository.interface';
import { Product } from './application/domain/product';
import { NotFoundError } from '@prisma/client/runtime/library';

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

  async getProducts(): Promise<Product[]> {
    const dbProducts: DBProduct[] = await this.prisma.product.findMany();
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
}
