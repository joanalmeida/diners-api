export class Product {
  constructor(
    id: string,
    dinerId: string,
    name: string,
    description: string,
    price: number,
    state: string,
  ) {
    this.id = id;
    this.dinerId = dinerId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.state = state;
  }

  id: string;
  dinerId: string;
  name: string;
  description: string;
  // categories:
  price: number;
  state: string;
  // discount?: number;
}
