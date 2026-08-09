import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { landingService } from '../../services/landing.service/landing.service';
import { of } from 'rxjs';

describe('Landing', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent ],
      providers: [
        {
          provide: landingService,
          useValue: {
            getFilms: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate slug', () => {
    expect(component.toSlug('A New Hope'))
      .toBe('a-new-hope');
  });
});