export class Product {
  constructor(public _id: string,
              public name: string,
              public description: string,
              public price: number,
              public category: string,
              public image: string,
              public rating: number,
              public available: number,
              public normalPrice: number) {
  }
}
