import { TestBed } from '@angular/core/testing';

import { Roomservics } from './roomservics';

describe('Roomservics', () => {
  let service: Roomservics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Roomservics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
