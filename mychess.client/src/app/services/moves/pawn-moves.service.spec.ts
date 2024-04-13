import { TestBed } from '@angular/core/testing';

import { PawnMovesService } from './pawn-moves.service';

describe('PawnMovesService', () => {
  let service: PawnMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
