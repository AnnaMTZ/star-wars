import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Vehicle } from './vehicle';
import { landingService } from '../../services/landing.service/landing.service';

describe('Vehicle', () => {
  let component: Vehicle;
  let fixture: ComponentFixture<Vehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vehicle],
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
            getVehicles: () => of([]),
            getFilms: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Vehicle);
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

  it('should return null when no vehicles are loaded', () => {
    expect(component.currentVehicle).toBeNull();
  });
});