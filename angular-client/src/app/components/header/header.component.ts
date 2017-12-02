import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DisplayService, View} from "../../services/display/display.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private displayService: DisplayService) {
  }

  ngOnInit() {
  }

  signIn() {
    this.displayService.changeView(View.SignIn);
  }

  signUp() {
    this.displayService.changeView(View.SignUp);
  }
}
