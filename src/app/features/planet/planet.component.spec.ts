import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanetComponent } from './planet.component';
import { SwapiService } from '../../core/services/landing.service/landing.service';

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  describe('with data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PlanetComponent],
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
              getPlanets: () =>
                of([
                  {
                    name: 'Tatooine',
                    url: 'https://swapi.dev/api/planets/1/',
                    films: ['film-1'],
                  },
                ]),
              getFilms: () =>
                of([
                  {
                    title: 'A New Hope',
                    url: 'film-1',
                  },
                ]),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PlanetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get planet id from route', () => {
      expect(component.planetId).toBe('1');
    });

    it('should create slug', () => {
      expect(component.toSlug('A New Hope'))
        .toBe('a-new-hope');
    });

    it('should return current planet', () => {
      expect(component.currentPlanet?.name)
        .toBe('Tatooine');
    });

    it('should return related films', () => {
      expect(component.relatedFilms.length).toBe(1);
    });

    it('should return correct related film', () => {
      expect(component.relatedFilms[0].title)
        .toBe('A New Hope');
    });
  });

  describe('without matching planet', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PlanetComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '999',
                },
              },
            },
          },
          {
            provide: SwapiService,
            useValue: {
              getPlanets: () =>
                of([
                  {
                    name: 'Tatooine',
                    url: 'https://swapi.dev/api/planets/1/',
                    films: ['film-1'],
                  },
                ]),
              getFilms: () =>
                of([
                  {
                    title: 'A New Hope',
                    url: 'film-1',
                  },
                ]),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PlanetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should return null when planet is not found', () => {
      expect(component.currentPlanet).toBeNull();
    });

    it('should return empty related films when planet is not found', () => {
      expect(component.relatedFilms).toEqual([]);
    });
  });

  describe('with empty data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PlanetComponent],
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
              getPlanets: () => of([]),
              getFilms: () => of([]),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PlanetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should return null when no planets exist', () => {
      expect(component.currentPlanet).toBeNull();
    });

    it('should return no related films', () => {
      expect(component.relatedFilms).toEqual([]);
    });
  });
});