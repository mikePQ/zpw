import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayService, View} from "../../services/display/display.service";
import {AuthListener, AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AuthListener {

  isLoggedIn: boolean = false;

  constructor(private displayService: DisplayService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.addListener(this);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signIn() {
    this.displayService.changeView(View.SignIn);
  }

  signUp() {
    this.displayService.changeView(View.SignUp);
  }

  signOut() {
    this.authService.signOut();
  }

  userSignedIn() {
    this.isLoggedIn = true;
  }

  userSignedOut() {
    this.isLoggedIn = false;
  }
}
