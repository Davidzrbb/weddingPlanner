import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WishService {

  private urlWish = `${environment.apiUrl}/wish`;

  constructor(private http: HttpClient) {
  }

  getAll(idCategory: string): Observable<any> {
    return this.http.get<any>(`${this.urlWish}/${idCategory}`);
  }

  update(idCategory: string, updateWish: { text: string; fk_category: string }) {
    return this.http.put<any>(`${this.urlWish}/${idCategory}`, updateWish);
  }

}
