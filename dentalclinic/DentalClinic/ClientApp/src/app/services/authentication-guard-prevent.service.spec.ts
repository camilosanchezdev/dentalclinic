import { TestBed } from '@angular/core/testing';

import { AuthenticationGuardPreventService } from './authentication-guard-prevent.service';

describe('AuthenticationGuardPreventService', () => {
  let service: AuthenticationGuardPreventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationGuardPreventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
