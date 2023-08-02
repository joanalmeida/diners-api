import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from './application/port/out/productRepository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  getProducts() {
    return this.productRepository.getProducts();
  }

  getById(productId: string) {
    return this.productRepository.getById(productId);
  }
}
