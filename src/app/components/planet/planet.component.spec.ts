import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanetComponent } from './planet.component';
import { landingService } from '../../services/landing.service/landing.service';

describe('Planet', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetComponent ],
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
          provide: landingService,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a slug', () => {
    expect(component.toSlug('A New Hope'))
      .toBe('a-new-hope');
  });

  it('should return null when no planets are loaded', () => {
    expect(component.currentPlanet).toBeNull();
  });
});