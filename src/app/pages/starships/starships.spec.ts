import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Starships } from './starships';

describe('Starships', () => {
  let component: Starships;
  let fixture: ComponentFixture<Starships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Starships],
    }).compileComponents();

    fixture = TestBed.createComponent(Starships);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
