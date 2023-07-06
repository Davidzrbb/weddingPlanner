import {Component, OnInit} from '@angular/core';
import {ErrorMessage} from "../models/ErrorMessage";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Connexion} from "../models/Connexion";

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
  connexion: Connexion = {}

  ngOnInit() {

  }

  constructor(private router: Router, private authService: AuthService) {
  }


  closeAlert() {
    this.errorMessage.error = false;
  }

  async checkConnection(login: string, password: string) {
    this.connexion.login = login;
    this.connexion.password = password;
    this.authService.connexion(this.connexion).subscribe((response) => {
        localStorage.setItem('token', response.response);
        this.router.navigate(['/todo']);
      },
      (error) => {
        this.errorMessage.error = true;
        this.errorMessage.message = "Login ou mot de passe incorrect";
        console.log(error)
      });
  }
}
