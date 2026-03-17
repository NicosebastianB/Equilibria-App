import { TestBed } from '@angular/core/testing';

import { Calificable } from './calificable';

describe('Calificable', () => {
  let service: Calificable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Calificable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
