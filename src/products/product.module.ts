import { Module } from '@nestjs/common';
import { ProductController } from './adapter/product.controller';
import { ProductService } from './product.service';
import { DBProductRepository } from './product.repository';
import { MemoryProductRepository } from './product.memoryrepository';
import { GetProductsUseCase } from './application/useCase/getProducts.usecase';
import { GetProductByIdUseCase } from './application/useCase/getProductById.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    GetProductsUseCase,
    GetProductByIdUseCase,
    {
      useClass: DBProductRepository,
      provide: 'IProductRepository',
    },
  ],
})
export class ProductModule {}
