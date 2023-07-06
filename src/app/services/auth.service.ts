import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of} from "rxjs";
import {Connexion} from "../models/Connexion";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  connexion(connexion: Connexion): Observable<any> {
    return this.http.post<any>(`${this.urlAuth}`, connexion);
  }

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${this.urlAuth}/token`, {token: token}).pipe(
      map((response) => {
        return !!response.response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle the error and return false
        console.error('Error occurred during token check:', error);
        return of(false);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.checkToken();
  }
}

