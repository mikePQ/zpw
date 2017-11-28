import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class NotificationService {

  private socket: any;

  constructor() {
  }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3000');

    let observable = new Observable(observer => {
      this.socket.on('notification', (data) => {
        console.log("Received message from Websocket Server");
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }

}
