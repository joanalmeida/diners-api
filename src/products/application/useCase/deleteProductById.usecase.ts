import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../port/out/productRepository.interface';

@Injectable()
export class DeleteProductByIdUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(productId: string): Promise<void> {
    return await this.productRepository.deleteById(productId);
  }
}
