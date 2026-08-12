import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpecieComponent } from './specie.component';
import { landingService } from '../../services/landing.service/landing.service';

describe('Specie', () => {
  let component: SpecieComponent;
  let fixture: ComponentFixture<SpecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecieComponent],
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

    fixture = TestBed.createComponent(SpecieComponent);
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
  //     component.specieId('https://swapi.info/api/films/1')
  //   ).toBe('1');
  // });

  it('should return null when no species are loaded', () => {
    expect(component.currentSpecie).toBeNull();
  });
});