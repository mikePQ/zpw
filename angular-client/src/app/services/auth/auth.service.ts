import {Injectable} from '@angular/core';
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";
import decode from 'jwt-decode';

@Injectable()
export class AuthService {
  private listeners: Array<AuthListener> = [];

  constructor(private httpClient: HttpClient) {
  }

  login(user: User, callback: () => void, asAdmin: boolean = false) {
    let body: any = user;
    body.asAdmin = asAdmin;

    this.httpClient.post<any>('http://localhost:3000/users/signin', body).subscribe(response => {
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
    let token = localStorage.getItem('token');
    if (token === null) {
      return false;
    }

    let expired = this.isExpired(token);
    if (expired) {
      localStorage.removeItem('token');
    }

    return !expired;
  }

  isAdmin() {
    if (!this.isLoggedIn()) {
      return false;
    }

    let token = localStorage.getItem('token');
    if (token === null) {
      return false;
    }

    let decoded = decode(token);
    let user = decoded.user;
    return user.roles.includes('admin');
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

  private isExpired(token: string): boolean {
    let decoded = decode(token);
    let now = Date.now() / 1000;
    return now >= decoded.exp;
  }
}

export interface AuthListener {
  userSignedIn();

  userSignedOut();
}
