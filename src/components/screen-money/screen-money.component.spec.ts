import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenMoneyComponent } from './screen-money.component';

describe('ScreenMoneyComponent', () => {
  let component: ScreenMoneyComponent;
  let fixture: ComponentFixture<ScreenMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
