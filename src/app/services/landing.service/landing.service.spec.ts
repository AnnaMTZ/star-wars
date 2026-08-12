import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { landingService } from './landing.service';
import { environment } from '../../environment';

describe('landingService', () => {
  let service: landingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        landingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(landingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get person', () => {
    service.getPerson('1').subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/people/1`)
      .flush({});
  });

  it('should get planet', () => {
    service.getPlanet('1').subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/planets/1`)
      .flush({});
  });

  it('should get specie', () => {
    service.getSpecie('1').subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/species/1`)
      .flush({});
  });

  it('should get vehicle', () => {
    service.getVehicle('1').subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/vehicles/1`)
      .flush({});
  });

  it('should get starship', () => {
    service.getStarship('1').subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/starship/1`)
      .flush({});
  });

  it('should get people', () => {
    service.getPeople().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/people`)
      .flush([]);
  });

  it('should get films', () => {
    service.getFilms().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/films`)
      .flush([]);
  });

  it('should get planets', () => {
    service.getPlanets().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/planets`)
      .flush([]);
  });

  it('should get species', () => {
    service.getSpecies().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/species`)
      .flush([]);
  });

  it('should get vehicles', () => {
    service.getVehicles().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/vehicles`)
      .flush([]);
  });

  it('should get starships', () => {
    service.getStarships().subscribe();
    httpMock
      .expectOne(`${environment.apiUrl}/starships`)
      .flush([]);
  });

  it('should handle api error', () => {
    service.getFilms().subscribe({
      next: () => fail('should error'),
      error: (error) => {
        expect(error.message).toContain('Error 500');
      },
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/films`
    );

    req.flush('Server Error', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});

function fail(arg0: string): void {
  throw new Error('Function not implemented.');
}
