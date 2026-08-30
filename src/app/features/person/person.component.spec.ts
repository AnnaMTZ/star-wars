import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonComponent } from './person.component';
import { SwapiService } from '../../core/services/swapi.service';

describe('PersonComponent', () => {
  let component: PersonComponent;

  const personUrl = 'https://swapi.dev/api/people/1/';
  const planetUrl = 'https://swapi.dev/api/planets/1/';
  const specieUrl = 'https://swapi.dev/api/species/1/';
  const vehicleUrl = 'https://swapi.dev/api/vehicles/4/';
  const starshipUrl = 'https://swapi.dev/api/starships/12/';
  const filmUrl = 'https://swapi.dev/api/films/1/';

  const mockPeople = [
    {
      name: 'Luke Skywalker',
      url: personUrl,
      homeworld: planetUrl,
      species: [specieUrl],
      vehicles: [vehicleUrl],
      starships: [starshipUrl],
      films: [filmUrl],
    },
  ];

  const mockPlanets = [
    {
      name: 'Tatooine',
      url: planetUrl,
    },
  ];

  const mockSpecies = [
    {
      name: 'Human',
      url: specieUrl,
    },
  ];

  const mockVehicles = [
    {
      name: 'Sand Crawler',
      url: vehicleUrl,
    },
  ];

  const mockStarships = [
    {
      name: 'X-wing',
      url: starshipUrl,
    },
  ];

  const mockFilms = [
    {
      title: 'A New Hope',
      url: filmUrl,
    },
  ];

  const swapiServiceMock = {
    getPeople: jasmine.createSpy().and.returnValue(of(mockPeople)),
    getFilms: jasmine.createSpy().and.returnValue(of(mockFilms)),
    getPlanets: jasmine.createSpy().and.returnValue(of(mockPlanets)),
    getSpecies: jasmine.createSpy().and.returnValue(of(mockSpecies)),
    getVehicles: jasmine.createSpy().and.returnValue(of(mockVehicles)),
    getStarships: jasmine.createSpy().and.returnValue(of(mockStarships)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent],
      providers: [
        {
          provide: SwapiService,
          useValue: swapiServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) =>
                  key === 'id' ? '1' : null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve current person', () => {
    const person = component.currentPerson();

    expect(person).toBeTruthy();
    expect(person?.name).toBe('Luke Skywalker');
  });

  it('should resolve homeworld', () => {
    const homeworld = component.homeworld();

    expect(homeworld).toBeTruthy();
    expect(homeworld?.name).toBe('Tatooine');
  });

  it('should resolve species', () => {
    const species = component.personSpecies();

    expect(species.length).toBe(1);
    expect(species[0].name).toBe('Human');
  });

  it('should resolve vehicles', () => {
    const vehicles = component.personVehicles();

    expect(vehicles.length).toBe(1);
    expect(vehicles[0].name).toBe('Sand Crawler');
  });

  it('should resolve starships', () => {
    const starships = component.personStarships();

    expect(starships.length).toBe(1);
    expect(starships[0].name).toBe('X-wing');
  });

  it('should resolve films', () => {
    const films = component.personFilms();

    expect(films.length).toBe(1);
    expect(films[0].title).toBe('A New Hope');
  });

  it('should extract person id from route', () => {
    expect(component.personId).toBe('1');
  });
});