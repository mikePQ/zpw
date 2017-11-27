import {Product} from "../../models/Product";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

export class ProductsMock {

  static getProducts(): Observable<Array<Product>> {
    return Observable.of([
      {
        _id: "1",
        name: "PIŁKA DO KOSZYKÓWKI LAY UP ROZMIAR 7 KIPSTA",
        description: "Kauczukowa powłoka tej piłki do koszykówki zapewnia doskonałą wytrzymałość, a wyjątkowy design (16 paneli) gwarantuje idealną przyczepność.",
        price: 10,
        category: "Koszykówka",
        image: "assets/img/1.jpg",
        rating: 5,
        available: 2
      },
      {
        _id: "2",
        name: "PIŁKA DO PIŁKI NOŻNEJ FEUTRINE KIPSTA",
        description: "Przeznaczenie: do rekreacyjnej (1 -2 razy w tygodniu) gry w piłkę nożną w 5 zawodników, na parkiecie lub wykładzinie PVC (FUTSAL).\n" +
        "Piłka z filcową powłoką i standardowym odbiciem",
        price: 20,
        category: "Piłka nożna",
        image: "assets/img/2.jpg",
        rating: 4,
        available: 8
      },
      {
        _id: "3",
        name: "PIŁKA DO KOSZYKÓWKI NBA ALL STAR ROZMIAR 7 UHLSPORT",
        description: "Przeznaczenie: do gry w koszykówkę, na hali i boiskach zewnętrznych, na treningi i zawody.\n" +
        "Piłka NBA ALLSTAR to doskonałe rozwiązanie w kwestii wytrzymałości i parametrów podczas gry.",
        price: 50,
        category: "Koszykówka",
        image: "assets/img/3.jpg",
        rating: 3,
        available: 5
      },
      {
        _id: "4",
        name: "BRAMKA DO PIŁKI NOŻNEJ CLASSIC GOAL S KIPSTA",
        description: "Przeznaczenie: do rekreacyjnej (3 - 4 razy w tygodniu) gry w piłkę nożną. Bramka odpowiednia do każdego ogrodu.\n" +
        "Ta minibramka piłkarska jest odporna na uderzenia i niepogodę. Posiada gwarancję na 2 lata, a jej wymiary (0,9x0,7m) pozwalają małym i dużym zawodnikom grać bez bramkarza.",
        price: 100,
        category: "Piłka nożna",
        image: "assets/img/4.jpg",
        rating: 5,
        available: 10
      },
      {
        _id: "5",
        name: "PIŁKA DO KOSZYKÓWKI TARMAK 500 MAGIC JAM T7 TARMAK",
        description: "Przeznaczenie: do intensywnej gry w koszykówkę na boiskach zewnętrznych.\n" +
        "Ta piłka do koszykówki z powłoką z kauczuku jest niezwykle wytrzymała. Żłobione panele (jak w oponie) zapewniają doskonały chwyt.",
        price: 30,
        category: "Koszykówka",
        image: "assets/img/5.jpg",
        rating: 4,
        available: 15
      },
      {
        _id: "6",
        name: "BUTY HALOWE DO PIŁKI NOŻNEJ NEMEZIZ 17.4 ADIDAS",
        description: "Przeznaczenie: do regularnej gry w piłkę nożną na gładkiej nawierzchni.\n" +
        "Te męskie buty do piłki nożnej halowej posiadają dopasowaną cholewkę Agility Touch zapewniającą komfort i wydajność.",
        price: 50,
        category: "Piłka nożna",
        image: "assets/img/6.jpg",
        rating: 3,
        available: 20
      },
      {
        _id: "7",
        name: "PIŁKA DO PIŁKI NOŻNEJ FC BARCELONA NIKE",
        description: "Przeznaczenie: do gry w piłkę nożną na naturalnej nawierzchni. Szyta maszynowo.\n" +
        "Piłka w barwach słynnego klubu z Barcelony.",
        price: 15,
        category: "Piłka nożna",
        image: "assets/img/7.jpg",
        rating: 5,
        available: 10
      },
      {
        _id: "8",
        name: "PIŁKA DO RUGBY FULL H 300 ROZM. 3 KIPSTA",
        description: "Przeznaczenie: przeznaczona do rekreacyjnej gry.\n" +
        "Dzięki łatwości chwytania piłki oraz wytrzymałości ta piłka doskonale nadaje się na treningi, w szczególności dla początkujących i szkółek rugby.",
        price: 25,
        category: "Rugby",
        image: "assets/img/8.jpg",
        rating: 2,
        available: 5
      },
      {
        _id: "9",
        name: "ZESTAW HANTLI 10 KG DOMYOS",
        description: "Przeznaczenie: do treningu siłowego przy użyciu hantli.\n" +
        "Idealny zestaw hantli dla początkujących: umożliwia wykonywanie licznych ćwiczeń siłowych na bicepsy, tricepsy, mięśnie naramienne i klatki piersiowej (4x1kg - 2x2kg - gryf 2kg).",
        price: 30,
        category: "Siłownia",
        image: "assets/img/9.jpg",
        rating: 5,
        available: 12
      },
      {
        _id: "10",
        name: "HANTLE HEX DUMBBELL 15KG DOMYOS",
        description: "Przeznaczenie: do treningu crossowego (np. obwodowego, funkcjonalnego). Idealny do przygotowania fizycznego.\n" +
        "Uniwersalne hantle do treningu siłowego i ćwiczeń funkcjonalnych (np. pompek). Ich sześciokątny kształt zapewnia stabilność. Wytrzymały kauczuk chroni przed uderzeniem.",
        price: 45,
        category: "Siłownia",
        image: "assets/img/10.jpg",
        rating: 5,
        available: 10
      }
    ]);
  }
}
