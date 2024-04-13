import { TestBed } from '@angular/core/testing';

import { BishopMovesStrategyService } from './bishop-moves-strategy.service';

describe('BishopMovesStrategyService', () => {
  let service: BishopMovesStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BishopMovesStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
