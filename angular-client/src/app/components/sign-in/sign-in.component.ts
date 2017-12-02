import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/User";
import {DisplayService, View} from "../../services/display/display.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private displayService: DisplayService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    let user = new User(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.login(user, () => {
      this.displayService.changeView(this.displayService.getPreviousView());
    });
  }

  signUp() {
    this.displayService.changeView(View.SignUp);
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

}
