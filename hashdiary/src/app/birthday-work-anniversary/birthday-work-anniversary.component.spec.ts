import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayWorkAnniversaryComponent } from './birthday-work-anniversary.component';

describe('BirthdayWorkAnniversaryComponent', () => {
  let component: BirthdayWorkAnniversaryComponent;
  let fixture: ComponentFixture<BirthdayWorkAnniversaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayWorkAnniversaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayWorkAnniversaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
