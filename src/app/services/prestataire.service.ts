import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  private urlPrestataire = `${environment.apiUrl}/service-provider`;

  constructor(private http: HttpClient) {
  }

  getAll(idCategory: string): Observable<any> {
    return this.http.get<any>(`${this.urlPrestataire}/${idCategory}`);
  }

  update(idPrestataire: number, updatePrestataire: { name: string; priority: string; state: boolean }) {
    return this.http.put<any>(`${this.urlPrestataire}/${idPrestataire}`, updatePrestataire);
  }

  delete(idPrestataire: number) {
    return this.http.delete<any>(`${this.urlPrestataire}/${idPrestataire}`);
  }

  create(createPrestataire: {
    name: string;
    contact: string;
    price: number,
    fk_category: string
  }) {
    return this.http.post<any>(`${this.urlPrestataire}`, createPrestataire);
  }
}
