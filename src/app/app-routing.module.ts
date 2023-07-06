import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {TodoComponent} from "./todo/todo.component";
import {DetailComponent} from "./detail/detail.component";
import {AuthGuard} from "./auth-guard";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'todo', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'detail', component: DetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}





