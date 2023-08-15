import { Module } from '@nestjs/common';
import { ProductController } from './adapter/product.controller';
import { DBProductRepository } from './product.repository';
import { GetProductsUseCase } from './application/useCase/getProducts.usecase';
import { GetProductByIdUseCase } from './application/useCase/getProductById.usecase';
import { DeleteProductByIdUseCase } from './application/useCase/deleteProductById.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    DeleteProductByIdUseCase,
    GetProductsUseCase,
    GetProductByIdUseCase,
    {
      useClass: DBProductRepository,
      provide: 'IProductRepository',
    },
  ],
})
export class ProductModule {}
