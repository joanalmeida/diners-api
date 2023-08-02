import { Product } from '../../domain/product';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getById(productId: string): Promise<Product>;
}
