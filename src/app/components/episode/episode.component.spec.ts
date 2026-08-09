import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EpisodeComponent } from './episode.component';
import { landingService } from '../../services/landing.service/landing.service';

describe('Episode', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'a-new-hope',
              },
            },
          },
        },
        {
          provide: landingService,
          useValue: {
            getFilms: () => of([]),
            getPlanets: () => of([]),
            getPeople: () => of([]),
            getSpecies: () => of([]),
            getVehicles: () => of([]),
            getStarships: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have episode name from route', () => {
    expect(component.episodeName).toBe('a-new-hope');
  });

  it('should generate background image path', () => {
    expect(component.backgroundImage)
      .toContain('a-new-hope');
  });

  it('should return a background style', () => {
    expect(component.backgroundStyle)
      .toContain('url(');
  });
});