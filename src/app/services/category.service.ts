import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {Categorie} from "../models/Categorie";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private urlCategory = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.get<any>(this.urlGetTotal, header).pipe(
      map((res: { reservation: any; }) => {
        return res.reservation;
      }));
  }

  delete(idReservation: number) {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.delete<any>(`${environment.apiUrl}/reservation/delete/${idReservation}`, header);
  }

  create(createReservation: { amount: string; dateStarted: Date; name: string; dateEnded: Date }) {
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.post<any>(`${environment.apiUrl}/reservation/create`, createReservation, header);
  }
}
