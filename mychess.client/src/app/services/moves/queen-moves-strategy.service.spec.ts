import { TestBed } from '@angular/core/testing';

import { QueenMovesStrategyService } from './queen-moves-strategy.service';

describe('QueenMovesStrategyService', () => {
  let service: QueenMovesStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueenMovesStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
