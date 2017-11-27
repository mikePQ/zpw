import {Order} from "./Order";

export class OrderSummary {
  constructor(public order: Order,
              public created: Date) {
  }
}
