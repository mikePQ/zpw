import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayService} from "../../services/display/display.service";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {

  @Input()
  user: User = new User('', '');

  constructor(private displayService: DisplayService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  signUp() {
    let authService = this.authService;
    let displayService = this.displayService;
    this.authService.signUp(this.user, () => {
      authService.login(this.user, () => displayService.changeView(displayService.getPreviousView()));
    });
  }

}
