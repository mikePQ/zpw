import {Injectable} from '@angular/core';
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  private listeners: Array<AuthListener> = [];

  constructor(private httpClient: HttpClient) {
  }

  login(user: User, callback: () => void) {
    this.httpClient.post<any>('http://localhost:3000/users/signin', user).subscribe(response => {
      let token = response.token;
      localStorage.setItem('token', token);
      callback();
      this.notifyUserSignedIn();
    });
  }

  signUp(user: User, callback: () => void) {
    this.httpClient.post<any>('http://localhost:3000/users', user).subscribe(response => {
      callback();
    });
  }

  addAuthToken(url: string): string {
    let token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return url + token;
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  signOut() {
    localStorage.removeItem('token');
    this.notifyUserSignedOut();
  }

  addListener(listener: AuthListener) {
    this.listeners.push(listener);
  }

  private notifyUserSignedIn() {
    this.listeners.forEach(listener => listener.userSignedIn());
  }

  private notifyUserSignedOut() {
    this.listeners.forEach(listener => listener.userSignedOut());
  }
}

export interface AuthListener {
  userSignedIn();

  userSignedOut();
}
