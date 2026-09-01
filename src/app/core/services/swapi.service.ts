import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Planet, Film, Person, Specie, Vehicle, Starship } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);

    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
getPerson(id: string): Observable<Person> {
  return this.http
    .get<Person>(`${environment.apiUrl}/people/${id}`)
    .pipe(catchError(this.handleError));
}

getPlanet(id: string): Observable<Planet> {
  return this.http
    .get<Planet>(`${environment.apiUrl}/planets/${id}`)
    .pipe(catchError(this.handleError));
}

getSpecie(id: string): Observable<Specie> {
  return this.http
    .get<Specie>(`${environment.apiUrl}/species/${id}`)
    .pipe(catchError(this.handleError));
}

getVehicle(id: string): Observable<Vehicle> {
  return this.http
    .get<Vehicle>(`${environment.apiUrl}/vehicles/${id}`)
    .pipe(catchError(this.handleError));
}

getStarship(id: string): Observable<Starship> {
  return this.http
    .get<Starship>(`${environment.apiUrl}/starships/${id}`)
    .pipe(catchError(this.handleError));
}

getPeople(): Observable<Person[]> {
  return this.http
    .get<Person[]>(`${environment.apiUrl}/people`)
    .pipe(catchError(this.handleError));
}

getFilms(): Observable<Film[]> {
  return this.http
    .get<Film[]>(`${environment.apiUrl}/films`)
    .pipe(catchError(this.handleError));
}

getPlanets(): Observable<Planet[]> {
  return this.http
    .get<Planet[]>(`${environment.apiUrl}/planets`)
    .pipe(catchError(this.handleError));
}

getSpecies(): Observable<Specie[]> {
  return this.http
    .get<Specie[]>(`${environment.apiUrl}/species`)
    .pipe(catchError(this.handleError));
}

getVehicles(): Observable<Vehicle[]> {
  return this.http
    .get<Vehicle[]>(`${environment.apiUrl}/vehicles`)
    .pipe(catchError(this.handleError));
}

getStarships(): Observable<Starship[]> {
  return this.http
    .get<Starship[]>(`${environment.apiUrl}/starships`)
    .pipe(catchError(this.handleError));
}
}