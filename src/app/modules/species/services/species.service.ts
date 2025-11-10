import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Species} from '../../../models/species.model';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private apiUrl = `${environment.apiUrl}/species`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  register(species: Species): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }

  fight(firstId: number, secondId: number): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/fight`, null, {
      params: { firstId, secondId },
    });
  }

  getRanking(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/ranking`);
  }

}
