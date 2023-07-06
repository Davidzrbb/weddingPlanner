import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlCard = `${environment.apiUrl}/card`;

  constructor(private http: HttpClient) {
  }

  getAll(idCategory: string): Observable<any> {
    return this.http.get<any>(`${this.urlCard}/${idCategory}`);
  }

  update(idCategory: number, updateCategory: { state: boolean; }) {
    return this.http.put<any>(`${this.urlCard}/${idCategory}`, updateCategory);
  }

  delete(idCard: number) {
    return this.http.delete<any>(`${this.urlCard}/${idCard}`);
  }

  create(createCategory: { name: string; state: boolean; fk_category: string; }) {
    return this.http.post<any>(this.urlCard, createCategory);
  }
}
