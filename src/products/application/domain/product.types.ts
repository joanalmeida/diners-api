import { Product } from './product';

export type Operator = ':' | '*';

export type ProductQuery = {
  [ProductProp in keyof Product]?: {
    operator: Operator;
    value: Product[ProductProp];
    // [K in Operator]?: Product[ProductProp];
  };
};
