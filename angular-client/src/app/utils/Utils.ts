export class Utils {
  static removeElement(array: Array<any>, element: any): Array<any> {
    let index = array.indexOf(element);
    let result = array.slice();
    if (index < 0) {
      return result;
    }
    result.splice(index, 1);
    return result;
  }
}
