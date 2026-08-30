import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SpecieComponent } from './specie.component';
import { SwapiService } from '../../core/services/swapi.service';

describe('SpecieComponent', () => {
  let component: SpecieComponent;
  let fixture: ComponentFixture<SpecieComponent>;
  let swapiServiceMock: jasmine.SpyObj<SwapiService>;

  const filmUrl = 'https://swapi.dev/api/films/1/';
  const specieUrl = 'https://swapi.dev/api/species/1/';

  const mockSpecies = [
    {
      name: 'Human',
      classification: 'Mammal',
      films: [filmUrl],
      url: specieUrl,
    },
    {
      name: 'Wookiee',
      classification: 'Mammal',
      films: [],
      url: 'https://swapi.dev/api/species/3/',
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
      ['getSpecies', 'getFilms']
    );

    swapiServiceMock.getSpecies.and.returnValue(
      of(mockSpecies as any)
    );

    swapiServiceMock.getFilms.and.returnValue(
      of(mockFilms as any)
    );

    await TestBed.configureTestingModule({
      imports: [SpecieComponent],
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

    fixture = TestBed.createComponent(SpecieComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the route id', () => {
    expect(component.specieId).toBe('1');
  });

  it('should load species', () => {
    expect(swapiServiceMock.getSpecies)
      .toHaveBeenCalled();
  });

  it('should load films', () => {
    expect(swapiServiceMock.getFilms)
      .toHaveBeenCalled();
  });

  it('should resolve the current species', () => {
    const species = component.currentSpecies();

    expect(species).not.toBeNull();
    expect(species?.name).toBe('Human');
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

  describe('currentSpecies', () => {
    it('should return null when species does not exist', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [SpecieComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getSpecies: () => of(mockSpecies),
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
        TestBed.createComponent(SpecieComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.currentSpecies()).toBeNull();
    });
  });

  describe('relatedFilms', () => {
    it('should return an empty array when species has no films', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [SpecieComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getSpecies: () =>
                of([
                  {
                    name: 'Wookiee',
                    films: [],
                    url: 'https://swapi.dev/api/species/3/',
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
                  get: () => '3',
                },
              },
            },
          },
        ],
      }).compileComponents();

      const fixture =
        TestBed.createComponent(SpecieComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });

    it('should return an empty array when current species is null', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [SpecieComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getSpecies: () => of([]),
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
      }).compileComponents();

      const fixture =
        TestBed.createComponent(SpecieComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });
  });
});