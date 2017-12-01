import {Purchaser} from "./Purchaser";
import {OrderItem} from "./OrderItem";

export class Order {
  constructor(public purchaser: Purchaser,
              public orderedItems: Array<OrderItem>,
              public _id: string = '',
              public orderStatus: OrderStatus = OrderStatus.SUBMITTED) {
  }
}

export enum OrderStatus {
  SUBMITTED = 1, COMPLETED = 2
}
