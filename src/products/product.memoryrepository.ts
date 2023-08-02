import { Product } from './application/domain/product';
import { IProductRepository } from './application/port/out/productRepository.interface';

export class MemoryProductRepository implements IProductRepository {
  getById(productId: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([
      new Product(
        'id-memoria',
        'diner-id',
        'Coca-Cola',
        'La que le gusta al Taser',
        350,
        'Available',
      ),
    ]);
  }
}
