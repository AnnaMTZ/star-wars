import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class landingService {
  private http = inject(HttpClient);

  // used in episode //
getPerson(id: string) {
  return this.http.get(`${environment.apiUrl}/people/${id}`);
}  

getPlanet(id: string) {
  return this.http.get(`${environment.apiUrl}/planets/${id}`);
}

getSpecie(id: string) {
  return this.http.get(`${environment.apiUrl}/species/${id}`);
}

getVehicle(id: string) {
  return this.http.get(`${environment.apiUrl}/vehicles/${id}`);
}

getStarship(id: string) {
  return this.http.get(`${environment.apiUrl}/starship/${id}`);
}

/// 
  getPeople() {
    return this.http.get(`${environment.apiUrl}/people`).pipe(tap((data: any) => console.log(data)));
  }



  getFilms() {
  return this.http.get<any[]>(
    `${environment.apiUrl}/films`
  );
}

getByUrl(url: string) {
  return this.http.get<any>(url);
}

  getPlanets() {
    return this.http.get<any[]>(`${environment.apiUrl}/planets`);
  }


  getSpecies() {
    return this.http.get<any[]>(`${environment.apiUrl}/species`);
  }

  getVehicles() {
    return this.http.get<any[]>(`${environment.apiUrl}/vehicles`);
  }

  getStarships() {
    return this.http.get<any[]>(`${environment.apiUrl}/starships`);
  }
}