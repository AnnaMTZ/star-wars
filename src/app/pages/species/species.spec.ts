import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Species } from './species';

describe('Species', () => {
  let component: Species;
  let fixture: ComponentFixture<Species>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Species],
    }).compileComponents();

    fixture = TestBed.createComponent(Species);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
