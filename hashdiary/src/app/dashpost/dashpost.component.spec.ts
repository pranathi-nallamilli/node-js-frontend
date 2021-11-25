import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashpostComponent } from './dashpost.component';

describe('DashpostComponent', () => {
  let component: DashpostComponent;
  let fixture: ComponentFixture<DashpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
