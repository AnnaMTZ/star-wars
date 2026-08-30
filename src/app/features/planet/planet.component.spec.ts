import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanetComponent } from './planet.component';
import { SwapiService } from '../../core/services/swapi.service';

describe('PlanetComponent', () => {
  let fixture: ComponentFixture<PlanetComponent>;
  let component: PlanetComponent;

  const filmUrl = 'https://swapi.dev/api/films/1/';
  const planetUrl = 'https://swapi.dev/api/planets/1/';

  const mockPlanets = [
    {
      name: 'Tatooine',
      climate: 'Arid',
      films: [filmUrl],
      url: planetUrl,
    },
    {
      name: 'Hoth',
      climate: 'Frozen',
      films: [],
      url: 'https://swapi.dev/api/planets/4/',
    },
  ];

  const mockFilms = [
    {
      title: 'A New Hope',
      url: filmUrl,
    },
    {
      title: 'The Empire Strikes Back',
      url: 'https://swapi.dev/api/films/2/',
    },
  ];


let swapiServiceMock: jasmine.SpyObj<SwapiService>;

  beforeEach(async () => {


  swapiServiceMock = jasmine.createSpyObj<SwapiService>(
    'SwapiService',
    ['getPlanets', 'getFilms']
  );
  ///temp, to remove any 
    swapiServiceMock.getPlanets.and.returnValue(of(mockPlanets) as any);
    swapiServiceMock.getFilms.and.returnValue(of(mockFilms) as any);

    await TestBed.configureTestingModule({
      imports: [PlanetComponent],
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

    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the route id', () => {
    expect(component.planetId).toBe('1');
  });

  it('should load planets', () => {
    expect(swapiServiceMock.getPlanets).toHaveBeenCalled();
  });

  it('should load films', () => {
    expect(swapiServiceMock.getFilms).toHaveBeenCalled();
  });

  it('should resolve the current planet', () => {
    const planet = component.currentPlanet();

    expect(planet).not.toBeNull();
    expect(planet?.name).toBe('Tatooine');
  });

  it('should return related films', () => {
    const films = component.relatedFilms();

    expect(films.length).toBe(1);
    expect(films[0].title).toBe('A New Hope');
  });

  describe('currentPlanet', () => {
    it('should return null when no matching planet exists', () => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        imports: [PlanetComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getPlanets: () => of(mockPlanets),
              getFilms: () => of(mockFilms),
            },
          },
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
        ],
      });

      const fixture = TestBed.createComponent(PlanetComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.currentPlanet()).toBeNull();
    });
  });

  describe('relatedFilms', () => {
    it('should return an empty array when planet has no films', () => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        imports: [PlanetComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getPlanets: () =>
                of([
                  {
                    name: 'Hoth',
                    films: [],
                    url: 'https://swapi.dev/api/planets/4/',
                  },
                ]),
              getFilms: () => of(mockFilms),
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '4',
                },
              },
            },
          },
        ],
      });

      const fixture = TestBed.createComponent(PlanetComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });

    it('should return an empty array when current planet is null', () => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        imports: [PlanetComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getPlanets: () => of([]),
              getFilms: () => of(mockFilms),
            },
          },
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
        ],
      });

      const fixture = TestBed.createComponent(PlanetComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });
  });

  it('should expose toSlug helper', () => {
    expect(component.toSlug('A New Hope'))
      .toBe('a-new-hope');
  });
});