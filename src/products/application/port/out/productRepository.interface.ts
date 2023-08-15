import { Product } from '../../domain/product';
import { ProductQuery } from '../../domain/product.types';

export interface IProductRepository {
  getProducts(search: ProductQuery): Promise<Product[]>;
  getById(productId: string): Promise<Product>;
  deleteById(productId: string): Promise<void>;
}
