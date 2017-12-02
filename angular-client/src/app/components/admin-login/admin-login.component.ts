import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  login2() {
    let user = new User(this.loginForm.value.email, this.loginForm.value.password);
    let router = this.router;
    this.authService.login(user, () => router.navigate(['/admin']), true);
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
}
