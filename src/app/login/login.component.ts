import {Component, OnInit} from '@angular/core';
import {ErrorMessage} from "../models/ErrorMessage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: ErrorMessage = {
    error: false,
    message: ""
  }

  ngOnInit() {

  }

  constructor(private router: Router) {
  }


  closeAlert() {
    this.errorMessage.error = false;
  }

  async checkConnection() {
    await this.router.navigate(['/todo']);
  }
}
