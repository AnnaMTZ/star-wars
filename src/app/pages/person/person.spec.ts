import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Person } from './person';
import { landingService } from '../../services/landing.service/landing.service';

describe('Person', () => {
  let component: Person;
  let fixture: ComponentFixture<Person>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Person],
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
            getPeople: () => of([]),
            getPlanets: () => of([]),
            getSpecies: () => of([]),
            getVehicles: () => of([]),
            getStarships: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Person);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract id from url', () => {
    expect(
      component.getId('https://swapi.info/api/people/1')
    ).toBe('1');
  });

  it('should return null when no people are loaded', () => {
    expect(component.currentPerson).toBeNull();
  });
});