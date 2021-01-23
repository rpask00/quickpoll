import { TestBed } from '@angular/core/testing';

import { VoteGuardGuard } from './vote-guard.guard';

describe('VoteGuardGuard', () => {
  let guard: VoteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VoteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
