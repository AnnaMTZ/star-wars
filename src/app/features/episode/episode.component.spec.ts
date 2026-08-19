import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EpisodeComponent } from './episode.component';
import { SwapiService } from '../../core/services/landing.service/landing.service';

describe('EpisodeComponent', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  describe('with film data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EpisodeComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getFilms: () =>
                of([
                  {
                    title: 'A New Hope',
                    episode_id: 4,
                    opening_crawl: 'crawl',
                    director: 'George Lucas',
                    producer: 'Gary Kurtz',
                    release_date: '1977-05-25',
                    url: 'film-url',
                  },
                ]),
              getPeople: () =>
                of([
                  {
                    name: 'Luke Skywalker',
                    films: ['film-url'],
                  },
                ]),
              getPlanets: () =>
                of([
                  {
                    name: 'Tatooine',
                    films: ['film-url'],
                  },
                ]),
              getSpecies: () =>
                of([
                  {
                    name: 'Human',
                    films: ['film-url'],
                  },
                ]),
              getVehicles: () =>
                of([
                  {
                    name: 'Sand Crawler',
                    films: ['film-url'],
                  },
                ]),
              getStarships: () =>
                of([
                  {
                    name: 'X-Wing',
                    films: ['film-url'],
                  },
                ]),
            },
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

      fixture = TestBed.createComponent(EpisodeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get movie name from route', () => {
      expect(component.episodeName).toBe('a-new-hope');
    });

    it('should generate background image', () => {
      expect(component.backgroundImage()).toBe(
        '/assets/images/a-new-hope.jpg'
      );
    });

    it('should generate background style', () => {
      expect(component.backgroundStyle()).toContain(
        'a-new-hope.jpg'
      );
    });

    it('should return current film', () => {
      const film = component.currentFilm();

      expect(film).toBeTruthy();
      expect(film?.title).toBe('A New Hope');
      expect(film?.episodeId).toBe(4);
    });

    it('should return characters', () => {
      expect(component.characters().length).toBe(1);
    });

    it('should return planets', () => {
      expect(component.filmPlanets().length).toBe(1);
    });

    it('should return species', () => {
      expect(component.filmSpecies().length).toBe(1);
    });

    it('should return vehicles', () => {
      expect(component.filmVehicles().length).toBe(1);
    });

    it('should return starships', () => {
      expect(component.filmStarships().length).toBe(1);
    });
  });

  describe('without film data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EpisodeComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getFilms: () => of([]),
              getPeople: () => of([]),
              getPlanets: () => of([]),
              getSpecies: () => of([]),
              getVehicles: () => of([]),
              getStarships: () => of([]),
            },
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

      fixture = TestBed.createComponent(EpisodeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should return null when film is not found', () => {
      expect(component.currentFilm()).toBeNull();
    });

    it('should return empty characters', () => {
      expect(component.characters()).toEqual([]);
    });

    it('should return empty planets', () => {
      expect(component.filmPlanets()).toEqual([]);
    });

    it('should return empty species', () => {
      expect(component.filmSpecies()).toEqual([]);
    });

    it('should return empty vehicles', () => {
      expect(component.filmVehicles()).toEqual([]);
    });

    it('should return empty starships', () => {
      expect(component.filmStarships()).toEqual([]);
    });
  });

  describe('without route parameter', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EpisodeComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getFilms: () => of([]),
              getPeople: () => of([]),
              getPlanets: () => of([]),
              getSpecies: () => of([]),
              getVehicles: () => of([]),
              getStarships: () => of([]),
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => null,
                },
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(EpisodeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should use default background image', () => {
      expect(component.backgroundImage()).toBe(
        '/assets/images/default.jpg'
      );
    });
  });
});