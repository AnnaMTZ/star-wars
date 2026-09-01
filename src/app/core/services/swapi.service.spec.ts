import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { SwapiService } from './swapi.service';
import { environment } from '../../environment';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SwapiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get person', () => {
    const mockPerson = {} as any;

    service.getPerson('1').subscribe((person) => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/people/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPerson);
  });

  it('should get planet', () => {
    const mockPlanet = {} as any;

    service.getPlanet('1').subscribe((planet) => {
      expect(planet).toEqual(mockPlanet);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/planets/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPlanet);
  });

  it('should get specie', () => {
    const mockSpecie = {} as any;

    service.getSpecie('1').subscribe((specie) => {
      expect(specie).toEqual(mockSpecie);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/species/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockSpecie);
  });

  it('should get vehicle', () => {
    const mockVehicle = {} as any;

    service.getVehicle('1').subscribe((vehicle) => {
      expect(vehicle).toEqual(mockVehicle);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/vehicles/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockVehicle);
  });

  it('should get starship', () => {
    const mockStarship = {} as any;

    service.getStarship('1').subscribe((starship) => {
      expect(starship).toEqual(mockStarship);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/starships/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockStarship);
  });

  it('should get people', () => {
    const mockPeople = [{}] as any[];

    service.getPeople().subscribe((people) => {
      expect(people).toEqual(mockPeople);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/people`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPeople);
  });

  it('should get films', () => {
    const mockFilms = [{}] as any[];

    service.getFilms().subscribe((films) => {
      expect(films).toEqual(mockFilms);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/films`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockFilms);
  });

  it('should get planets', () => {
    const mockPlanets = [{}] as any[];

    service.getPlanets().subscribe((planets) => {
      expect(planets).toEqual(mockPlanets);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/planets`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPlanets);
  });

  it('should get species', () => {
    const mockSpecies = [{}] as any[];

    service.getSpecies().subscribe((species) => {
      expect(species).toEqual(mockSpecies);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/species`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockSpecies);
  });

  it('should get vehicles', () => {
    const mockVehicles = [{}] as any[];

    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/vehicles`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockVehicles);
  });

  it('should get starships', () => {
    const mockStarships = [{}] as any[];

    service.getStarships().subscribe((starships) => {
      expect(starships).toEqual(mockStarships);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/starships`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockStarships);
  });

  it('should handle server errors', () => {
    service.getFilms().subscribe({
      next: () => fail('Expected request to fail'),
      error: (error: Error) => {
        expect(error).toBeTruthy();
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