import { TestBed } from '@angular/core/testing';

import { MoveFactory } from './MoveFactory';

describe('MovesService', () => {
  let service: MoveFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
