import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';
import { landingService } from '../../services/landing.service/landing.service';
import { of } from 'rxjs';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        {
          provide: landingService,
          useValue: {
            getFilms: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
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