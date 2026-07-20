import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANewHope } from './episode';

describe('ANewHope', () => {
  let component: ANewHope;
  let fixture: ComponentFixture<ANewHope>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ANewHope],
    }).compileComponents();

    fixture = TestBed.createComponent(ANewHope);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
