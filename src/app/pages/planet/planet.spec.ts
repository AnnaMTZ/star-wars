import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Planet } from './planet';
import { landingService } from '../../services/landing.service/landing.service';

describe('Planet', () => {
  let component: Planet;
  let fixture: ComponentFixture<Planet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Planet],
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

    fixture = TestBed.createComponent(Planet);
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