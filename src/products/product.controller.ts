import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:productId')
  getById(@Param('productId') productId: string) {
    return this.productService.getById(productId);
  }

  //get generico que busca todos los del diner
  //get especifico que agarra un solo producto
  //get por categoria

  //Un solo endpoint para multiples
  //UN endpoint para especifico
}
