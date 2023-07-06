import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlCategory = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.urlCategory);
  }

  update(idCategory: number, updateCategory: { name: string; priority: string; state: boolean }) {
    return this.http.put<any>(`${this.urlCategory}/${idCategory}`, updateCategory);
  }

  delete(idCategory: number) {
    return this.http.delete<any>(`${this.urlCategory}/${idCategory}`);
  }

  create(createCategory: { name: string; priority: string; state: boolean }) {
    return this.http.post<any>(this.urlCategory, createCategory);
  }
}
