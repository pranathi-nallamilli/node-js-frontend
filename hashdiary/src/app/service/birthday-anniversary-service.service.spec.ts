import { TestBed } from '@angular/core/testing';

import { BirthdayAnniversaryServiceService } from './birthday-anniversary-service.service';

describe('BirthdayAnniversaryServiceService', () => {
  let service: BirthdayAnniversaryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayAnniversaryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
