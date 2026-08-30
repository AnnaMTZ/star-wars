import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { VehicleComponent } from './vehicle.component';
import { SwapiService } from '../../core/services/swapi.service';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  let swapiServiceMock: jasmine.SpyObj<SwapiService>;

  const filmUrl = 'https://swapi.dev/api/films/1/';
  const vehicleUrl = 'https://swapi.dev/api/vehicles/4/';

  const mockVehicles = [
    {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      films: [filmUrl],
      url: vehicleUrl,
    },
    {
      name: 'AT-AT',
      model: 'All Terrain Armored Transport',
      films: [],
      url: 'https://swapi.dev/api/vehicles/16/',
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
      ['getVehicles', 'getFilms']
    );

    swapiServiceMock.getVehicles.and.returnValue(
      of(mockVehicles as any)
    );

    swapiServiceMock.getFilms.and.returnValue(
      of(mockFilms as any)
    );

    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
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
                  key === 'id' ? '4' : null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read vehicle id from route', () => {
    expect(component.vehicleId).toBe('4');
  });

  it('should load vehicles', () => {
    expect(swapiServiceMock.getVehicles)
      .toHaveBeenCalled();
  });

  it('should load films', () => {
    expect(swapiServiceMock.getFilms)
      .toHaveBeenCalled();
  });

  it('should resolve current vehicle', () => {
    const vehicle = component.currentVehicle();

    expect(vehicle).not.toBeNull();
    expect(vehicle?.name).toBe('Sand Crawler');
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

  describe('currentVehicle', () => {
    it('should return null when vehicle does not exist', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [VehicleComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getVehicles: () => of(mockVehicles),
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
        TestBed.createComponent(VehicleComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.currentVehicle()).toBeNull();
    });
  });

  describe('relatedFilms', () => {
    it('should return empty array when vehicle has no films', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [VehicleComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getVehicles: () =>
                of([
                  {
                    name: 'AT-AT',
                    films: [],
                    url:
                      'https://swapi.dev/api/vehicles/16/',
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
                  get: () => '16',
                },
              },
            },
          },
        ],
      }).compileComponents();

      const fixture =
        TestBed.createComponent(VehicleComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });

    it('should return empty array when current vehicle is null', async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [VehicleComponent],
        providers: [
          {
            provide: SwapiService,
            useValue: {
              getVehicles: () => of([]),
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
      }).compileComponents();

      const fixture =
        TestBed.createComponent(VehicleComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      expect(component.relatedFilms()).toEqual([]);
    });
  });
});