import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { EpisodeComponent } from './episode.component';
import { SwapiService } from '../../core/services/swapi.service';
import { Film } from '../../core/models';

describe('EpisodeComponent', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  const mockFilm = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    release_date: '1977-05-25',
    url: 'https://swapi.dev/api/films/1/',
  } as Film;

  const swapiServiceMock = {
    getFilms: jasmine.createSpy('getFilms').and.returnValue(
      of([mockFilm])
    ),

    getPeople: jasmine.createSpy('getPeople').and.returnValue(
      of([
        {
          name: 'Luke Skywalker',
          films: [mockFilm.url],
        },
        {
          name: 'Darth Vader',
          films: [mockFilm.url],
        },
      ])
    ),

    getPlanets: jasmine.createSpy('getPlanets').and.returnValue(
      of([
        {
          name: 'Tatooine',
          films: [mockFilm.url],
        },
      ])
    ),

    getSpecies: jasmine.createSpy('getSpecies').and.returnValue(
      of([
        {
          name: 'Human',
          films: [mockFilm.url],
        },
      ])
    ),

    getVehicles: jasmine.createSpy('getVehicles').and.returnValue(
      of([
        {
          name: 'Sand Crawler',
          films: [mockFilm.url],
        },
      ])
    ),

    getStarships: jasmine.createSpy('getStarships').and.returnValue(
      of([
        {
          name: 'X-wing',
          films: [mockFilm.url],
        },
      ])
    ),
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
              paramMap: convertToParamMap({
                movie: 'a-new-hope',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read episode name from route', () => {
    expect(component.episodeName).toBe('a-new-hope');
  });

  it('should resolve current film', () => {
    const film = component.currentFilm();

    expect(film).not.toBeNull();
    expect(film?.title).toBe('A New Hope');
    expect(film?.episodeId).toBe(4);
    expect(film?.director).toBe('George Lucas');
  });

  it('should resolve film characters', () => {
    const characters = component.characters();

    expect(characters.length).toBe(2);
    expect(characters[0]?.name).toBe('Luke Skywalker');
  });

  it('should resolve film planets', () => {
    const planets = component.filmPlanets();

    expect(planets.length).toBe(1);
    expect(planets[0]?.name).toBe('Tatooine');
  });

  it('should resolve film species', () => {
    const species = component.filmSpecies();

    expect(species.length).toBe(1);
    expect(species[0]?.name).toBe('Human');
  });

  it('should resolve film vehicles', () => {
    const vehicles = component.filmVehicles();

    expect(vehicles.length).toBe(1);
    expect(vehicles[0]?.name).toBe('Sand Crawler');
  });

  it('should resolve film starships', () => {
    const starships = component.filmStarships();

    expect(starships.length).toBe(1);
    expect(starships[0]?.name).toBe('X-wing');
  });

  it('should build background image path', () => {
    expect(component.backgroundImage()).toBe(
      '/assets/images/a-new-hope.jpg'
    );
  });

  it('should build background style', () => {
    expect(component.backgroundStyle()).toBe(
      "url('/assets/images/a-new-hope.jpg')"
    );
  });

  it('should call all service methods', () => {
    expect(swapiServiceMock.getFilms).toHaveBeenCalled();
    expect(swapiServiceMock.getPeople).toHaveBeenCalled();
    expect(swapiServiceMock.getPlanets).toHaveBeenCalled();
    expect(swapiServiceMock.getSpecies).toHaveBeenCalled();
    expect(swapiServiceMock.getVehicles).toHaveBeenCalled();
    expect(swapiServiceMock.getStarships).toHaveBeenCalled();
  });

  it('should return null when no film matches route', () => {
    spyOn(component.films, 'value').and.returnValue([]);

    expect(component.currentFilm()).toBeNull();
  });

  it('should return default background image when episode name is empty', () => {
    Object.defineProperty(component, 'episodeName', {
      value: '',
      configurable: true,
    });

    expect(component.backgroundImage()).toBe(
      '/assets/images/default.jpg'
    );
  });
});