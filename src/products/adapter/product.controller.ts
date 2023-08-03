import { Controller, Get, Param } from '@nestjs/common';
import { GetProductByIdUseCase } from '../application/useCase/getProductById.usecase';
import { GetProductsUseCase } from '../application/useCase/getProducts.usecase';

@Controller('/products')
export class ProductController {
  constructor(
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
  ) {}

  @Get()
  getProducts() {
    return this.getProductsUseCase.execute();
  }

  @Get('/:productId')
  getById(@Param('productId') productId: string) {
    return this.getProductByIdUseCase.execute(productId);
  }

  //get generico que busca todos los del diner
  //get especifico que agarra un solo producto
  //get por categoria

  //Un solo endpoint para multiples
  //UN endpoint para especifico
}
