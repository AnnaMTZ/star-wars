import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Starship } from './starship';
import { landingService } from '../../services/landing.service/landing.service';

describe('Starship', () => {
  let component: Starship;
  let fixture: ComponentFixture<Starship>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Starship],
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
            getStarships: () => of([]),
            getFilms: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Starship);
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

  it('should extract film id from url', () => {
    expect(
      component.getFilmId('https://swapi.info/api/films/1')
    ).toBe('1');
  });

  it('should return null when no starships are loaded', () => {
    expect(component.currentStarship).toBeNull();
  });
});