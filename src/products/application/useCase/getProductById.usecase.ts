import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product';
import { IProductRepository } from '../port/out/productRepository.interface';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(productId: string): Promise<Product> {
    return await this.productRepository.getById(productId);
  }
}
