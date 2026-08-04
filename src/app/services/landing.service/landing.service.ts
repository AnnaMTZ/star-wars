import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class landingService {
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

  getPerson(id: string) {
    return this.http
      .get(`${environment.apiUrl}/people/${id}`)
      .pipe(catchError(this.handleError));
  }

  getPlanet(id: string) {
    return this.http
      .get(`${environment.apiUrl}/planets/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSpecie(id: string) {
    return this.http
      .get(`${environment.apiUrl}/species/${id}`)
      .pipe(catchError(this.handleError));
  }

  getVehicle(id: string) {
    return this.http
      .get(`${environment.apiUrl}/vehicles/${id}`)
      .pipe(catchError(this.handleError));
  }

  getStarship(id: string) {
    return this.http
      .get(`${environment.apiUrl}/starship/${id}`)
      .pipe(catchError(this.handleError));
  }

  getPeople() {
    return this.http
      .get(`${environment.apiUrl}/people`)
      .pipe(catchError(this.handleError));
  }

  getFilms() {
    return this.http
      .get<any[]>(`${environment.apiUrl}/films`)
      .pipe(catchError(this.handleError));
  }

  getByUrl(url: string) {
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError));
  }

  getPlanets() {
    return this.http
      .get<any[]>(`${environment.apiUrl}/planets`)
      .pipe(catchError(this.handleError));
  }

  getSpecies() {
    return this.http
      .get<any[]>(`${environment.apiUrl}/species`)
      .pipe(catchError(this.handleError));
  }

  getVehicles() {
    return this.http
      .get<any[]>(`${environment.apiUrl}/vehicles`)
      .pipe(catchError(this.handleError));
  }

  getStarships() {
    return this.http
      .get<any[]>(`${environment.apiUrl}/starships`)
      .pipe(catchError(this.handleError));
  }
}