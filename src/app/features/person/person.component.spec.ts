import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonComponent } from './person.component';
import { SwapiService } from '../../core/services/landing.service/landing.service';

describe('PersonComponent', () => {
  let component: PersonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: SwapiService,
          useValue: {
            getPeople: () =>
              of([
                {
                  name: 'Luke Skywalker',
                  url: 'https://swapi.dev/api/people/1/',
                  homeworld: 'https://swapi.dev/api/planets/1/',
                  species: ['https://swapi.dev/api/species/1/'],
                  vehicles: ['https://swapi.dev/api/vehicles/1/'],
                  starships: ['https://swapi.dev/api/starships/1/'],
                  films: ['https://swapi.dev/api/films/1/'],
                },
              ]),
            getPlanets: () =>
              of([
                {
                  name: 'Tatooine',
                  url: 'https://swapi.dev/api/planets/1/',
                },
              ]),
            getSpecies: () =>
              of([
                {
                  name: 'Human',
                  url: 'https://swapi.dev/api/species/1/',
                },
              ]),
            getVehicles: () =>
              of([
                {
                  name: 'X-34 Landspeeder',
                  url: 'https://swapi.dev/api/vehicles/1/',
                },
              ]),
            getStarships: () =>
              of([
                {
                  name: 'X-Wing',
                  url: 'https://swapi.dev/api/starships/1/',
                },
              ]),
            getFilms: () =>
              of([
                {
                  title: 'A New Hope',
                  url: 'https://swapi.dev/api/films/1/',
                },
              ]),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve current person', () => {
    expect(component.currentPerson()?.name).toBe('Luke Skywalker');
  });

  it('should resolve homeworld', () => {
    expect(component.homeworld()?.name).toBe('Tatooine');
  });

  it('should resolve species', () => {
    expect(component.personSpecies()).toHaveLength(1);
  });

  it('should resolve vehicles', () => {
    expect(component.personVehicles()).toHaveLength(1);
  });

  it('should resolve starships', () => {
    expect(component.personStarships()).toHaveLength(1);
  });

  it('should resolve films', () => {
    expect(component.personFilms()).toHaveLength(1);
  });
});