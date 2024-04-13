import { TestBed } from '@angular/core/testing';

import { KnightMovesStrategyService } from './knight-moves-strategy.service';

describe('KnightMovesStrategyService', () => {
  let service: KnightMovesStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnightMovesStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
