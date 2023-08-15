import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ProductQuery } from '../application/domain/product.types';
import { DeleteProductByIdUseCase } from '../application/useCase/deleteProductById.usecase';
import { GetProductByIdUseCase } from '../application/useCase/getProductById.usecase';
import { GetProductsUseCase } from '../application/useCase/getProducts.usecase';

@Controller('/products')
export class ProductController {
  constructor(
    private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
  ) {}

  //* -> like
  //: -> equals
  //< -> menor
  //> -> mayor

  //?name=pepe -> usar like
  //?state=:Available&dinerId=:asd&name=*pepe
  @Get()
  getProducts(@Query() query: any) {
    const search = this.buildSearch(query);
    return this.getProductsUseCase.execute(search);
  }

  @Get('/:productId')
  getById(@Param('productId') productId: string) {
    return this.getProductByIdUseCase.execute(productId);
  }

  @Delete('/:productId')
  deleteById(@Param('productId') productId: string) {
    this.deleteProductByIdUseCase.execute(productId);
    return `Successfully deleted product with id ${productId}`;
  }

  //get generico que busca todos los del diner
  //get especifico que agarra un solo producto
  //get por categoria

  //Un solo endpoint para multiples
  //UN endpoint para especifico

  private buildSearch(query: any): ProductQuery {
    let search: ProductQuery = {};
    Object.keys(query).forEach((key) => {
      let parsedValue: string | number;
      const value = (query[key] as string).substring(1);

      if (!isNaN(Number(value))) {
        parsedValue = Number(value);
      } else {
        parsedValue = value;
      }

      search = {
        ...search,
        [key]: {
          operator: query[key][0],
          value: parsedValue,
        },
      };
    });

    console.log(search);

    return search;
  }
}
