import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    let user = new User(this.loginForm.value.username, this.loginForm.value.password);
    this.authService.login(user);
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

}
