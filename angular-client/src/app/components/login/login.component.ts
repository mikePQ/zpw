import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
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
