import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StarshipComponent } from './starship.component';
import { SwapiService } from '../../core/services/swapi.service';

describe('StarshipComponent', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;
  let swapiServiceMock: jasmine.SpyObj<SwapiService>;

  const filmUrl = 'https://swapi.dev/api/films/1/';
  const starshipUrl = 'https://swapi.dev/api/starships/12/';

  const mockStarships = [
    {
      name: 'X-wing',
      model: 'T-65 X-wing',
      films: [filmUrl],
      url: starshipUrl,
    },
    {
      name: 'Millennium Falcon',
      model: 'YT-1300',
      films: [],
      url: 'https://swapi.dev/api/starships/10/',
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

  beforeEach(async () => {
    swapiServiceMock = jasmine.createSpyObj(
      'SwapiService',
      ['getStarships', 'getFilms']
    );

    swapiServiceMock.getStarships.and.returnValue(
      of(mockStarships as any)
    );

    swapiServiceMock.getFilms.and.returnValue(
      of(mockFilms as any)
    );

    await TestBed.configureTestingModule({
      imports: [StarshipComponent],
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
                  key === 'id' ? '12' : null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read starship id from route', () => {
    expect(component.starshipId).toBe('12');
  });

  it('should load starships', () => {
    expect(swapiServiceMock.getStarships)
      .toHaveBeenCalled();
  });

  it('should load films', () => {
    expect(swapiServiceMock.getFilms)
      .toHaveBeenCalled();
  });

  it('should resolve current starship', () => {
    const starship = component.currentStarship();

    expect(starship).not.toBeNull();
    expect(starship?.name).toBe('X-wing');
  });

  it('should return related films', () => {
    const films = component.relatedFilms();

    expect(films.length).toBe(1);
    expect(films[0].title).toBe('A New Hope');
  });

  it('should expose toSlug helper', () => {
    expect(
      component.toSlug('The Empire Strikes Back')
    ).toBe('the-empire-strikes-back');
  });

  describe('currentStarship', () => {
    it('should return null when starship does not exist', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [StarshipComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getStarships: () => of(mockStarships),
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
      }).compileComponents();

      const fixture =
        TestBed.createComponent(StarshipComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.currentStarship())
        .toBeNull();
    });
  });

  describe('relatedFilms', () => {
    it('should return empty array when starship has no films', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [StarshipComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getStarships: () =>
                of([
                  {
                    name: 'Millennium Falcon',
                    films: [],
                    url: 'https://swapi.dev/api/starships/10/',
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
                  get: () => '10',
                },
              },
            },
          },
        ],
      }).compileComponents();

      const fixture =
        TestBed.createComponent(StarshipComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms())
        .toEqual([]);
    });

    it('should return empty array when current starship is null', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [StarshipComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getStarships: () => of([]),
              getFilms: () => of(mockFilms),
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '12',
                },
              },
            },
          },
        ],
      }).compileComponents();

      const fixture =
        TestBed.createComponent(StarshipComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms())
        .toEqual([]);
    });
  });
});