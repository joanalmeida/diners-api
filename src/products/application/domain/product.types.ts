import { Product } from './product';

export type Operator = ':' | '*';

export type ProductQuery = {
  [ProductProp in keyof Product]?: {
    operator: Operator;
    value: Product[ProductProp];
    mode: string;
    // [K in Operator]?: Product[ProductProp];
  };
};
