import { TestBed } from '@angular/core/testing';

import { RookMovesService } from './rook-moves.service';

describe('RookMovesService', () => {
  let service: RookMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RookMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
