import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DBProductRepository } from './product.repository';
import { MemoryProductRepository } from './product.memoryrepository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      useClass: DBProductRepository,
      provide: 'IProductRepository',
    },
  ],
})
export class ProductModule {}
