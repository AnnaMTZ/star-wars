import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StarshipComponent } from './starship.component';
import { SwapiService } from '../../core/services/landing.service/landing.service';

describe('Starship', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipComponent],
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
          provide: SwapiService,
          useValue: {
            getStarships: () => of([]),
            getFilms: () => of([]),
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

  it('should create a slug', () => {
    expect(component.toSlug('A New Hope'))
      .toBe('a-new-hope');
  });

  // it('should extract film id from url', () => {
  //   expect(
  //     component.getFilmId('https://swapi.info/api/films/1')
  //   ).toBe('1');
  // });

  it('should return null when no starships are loaded', () => {
    expect(component.currentStarship).toBeNull();
  });
});