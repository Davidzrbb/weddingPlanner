import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TodoComponent} from './todo/todo.component';
import {DecimalPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DetailComponent} from './detail/detail.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
