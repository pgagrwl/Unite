import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Swaps } from './swaps';

describe('Swaps', () => {
  let component: Swaps;
  let fixture: ComponentFixture<Swaps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swaps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Swaps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
