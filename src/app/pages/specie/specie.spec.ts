import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Specie } from './specie';
import { landingService } from '../../services/landing.service/landing.service';

describe('Specie', () => {
  let component: Specie;
  let fixture: ComponentFixture<Specie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Specie],
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
            getSpecies: () => of([]),
            getFilms: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Specie);
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

  it('should return null when no species are loaded', () => {
    expect(component.currentSpecie).toBeNull();
  });
});