import { TestBed } from '@angular/core/testing';

import { BoardSetupService } from './board-setup.service';

describe('BoardSetupService', () => {
  let service: BoardSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
