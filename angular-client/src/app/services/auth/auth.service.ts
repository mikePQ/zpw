import {Injectable} from '@angular/core';
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  login(user: User) {
    this.httpClient.post<any>('http://localhost:3000/users/signin', user).subscribe(response => {
      let token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['/admin']);
    });
  }

  addAuthToken(url: string): string {
    let token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return url + token;
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
