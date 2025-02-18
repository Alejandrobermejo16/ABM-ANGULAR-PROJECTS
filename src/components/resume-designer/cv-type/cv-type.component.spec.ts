import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTypeComponent } from './cv-type.component';

describe('CvTypeComponent', () => {
  let component: CvTypeComponent;
  let fixture: ComponentFixture<CvTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
