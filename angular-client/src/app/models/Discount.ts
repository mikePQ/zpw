export class Discount {
  constructor(public startTime: number,
              public endTime: number,
              public percentage: number,
              public products: Array<string>) {
  }
}
