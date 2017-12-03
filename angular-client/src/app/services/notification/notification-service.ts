import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  private socket: any;

  constructor() {
  }

  connect(): Subject<MessageEvent> {
    this.socket = io('http://195.181.222.52:3000');

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

    return Subject.create(observer, observable);
  }

}
