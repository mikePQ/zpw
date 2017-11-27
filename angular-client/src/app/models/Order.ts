import {Purchaser} from "./Purchaser";
import {OrderItem} from "./OrderItem";

export class Order {
  constructor(public purchaser: Purchaser,
              public orderedItems: Array<OrderItem>) {
  }
}
