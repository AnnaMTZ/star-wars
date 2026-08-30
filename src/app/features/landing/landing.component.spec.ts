import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SwapiService } from '../../core/services/swapi.service';
import { EpisodeComponent } from '../episode/episode.component';

describe('EpisodeComponent', () => {
  let component: EpisodeComponent;

  const filmUrl = 'https://swapi.dev/api/films/1/';

  const mockFilms = [
    {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: 'A long time ago...',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
      url: filmUrl,
    },
  ];

  const mockPeople = [
    {
      name: 'Luke Skywalker',
      films: [filmUrl],
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Darth Vader',
      films: [],
      url: 'https://swapi.dev/api/people/4/',
    },
  ];

  const mockPlanets = [
    {
      name: 'Tatooine',
      films: [filmUrl],
      url: 'https://swapi.dev/api/planets/1/',
    },
  ];

  const mockSpecies = [
    {
      name: 'Human',
      films: [filmUrl],
      url: 'https://swapi.dev/api/species/1/',
    },
  ];

  const mockVehicles = [
    {
      name: 'Sand Crawler',
      films: [filmUrl],
      url: 'https://swapi.dev/api/vehicles/4/',
    },
  ];

  const mockStarships = [
    {
      name: 'X-wing',
      films: [filmUrl],
      url: 'https://swapi.dev/api/starships/12/',
    },
  ];

  const swapiServiceMock = {
    getFilms: () => of(mockFilms),
    getPeople: () => of(mockPeople),
    getPlanets: () => of(mockPlanets),
    getSpecies: () => of(mockSpecies),
    getVehicles: () => of(mockVehicles),
    getStarships: () => of(mockStarships),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeComponent],
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
                get: () => 'a-new-hope',
              },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signals with correct values', () => {
    expect(component.showCrawl()).toBeTrue();
    expect(component.showFilmInfo()).toBeFalse();
  });

  it('should resolve current film', () => {
    const film = component.currentFilm();

    expect(film).toBeTruthy();
    expect(film?.title).toBe('A New Hope');
    expect(film?.episodeId).toBe(4);
    expect(film?.director).toBe('George Lucas');
  });

  it('should resolve film characters', () => {
    const characters = component.characters();

    expect(characters.length).toBe(1);
    expect(characters[0].name).toBe('Luke Skywalker');
  });

  it('should resolve film planets', () => {
    const planets = component.filmPlanets();

    expect(planets.length).toBe(1);
    expect(planets[0].name).toBe('Tatooine');
  });

  it('should resolve film species', () => {
    const species = component.filmSpecies();

    expect(species.length).toBe(1);
    expect(species[0].name).toBe('Human');
  });

  it('should resolve film vehicles', () => {
    const vehicles = component.filmVehicles();

    expect(vehicles.length).toBe(1);
    expect(vehicles[0].name).toBe('Sand Crawler');
  });

  it('should resolve film starships', () => {
    const starships = component.filmStarships();

    expect(starships.length).toBe(1);
    expect(starships[0].name).toBe('X-wing');
  });

  it('should generate background image path', () => {
    expect(component.backgroundImage())
      .toContain('a-new-hope.jpg');
  });

  it('should generate background style', () => {
    expect(component.backgroundStyle())
      .toContain('url(');
  });
});