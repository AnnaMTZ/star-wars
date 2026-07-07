import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class landingService {
  private http = inject(HttpClient);

  getPeople() {
    return this.http.get(`${environment.apiUrl}/people`).pipe(tap((data: any) => console.log(data)));
  }

  getPerson(id: number) {
    return this.http.get(`${environment.apiUrl}/people/${id}`);
  }


getFilms() {
  return this.http.get<any[]>(
    `${environment.apiUrl}/films`
  );
}


  getPlanets() {
    return this.http.get(`${environment.apiUrl}/planets`);
  }

  getSpecies() {
    return this.http.get(`${environment.apiUrl}/species`);
  }

  getVehicles() {
    return this.http.get(`${environment.apiUrl}/vehicles`);
  }

  getStarships() {
    return this.http.get(`${environment.apiUrl}/starships`);
  }


}