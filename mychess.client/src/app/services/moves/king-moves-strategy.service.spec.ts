import { TestBed } from '@angular/core/testing';

import { KingMovesStrategyService } from './king-moves-strategy.service';

describe('KingMovesStrategyService', () => {
  let service: KingMovesStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KingMovesStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
