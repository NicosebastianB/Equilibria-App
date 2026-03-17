import { TestBed } from '@angular/core/testing';

import { Corte } from './corte';

describe('Corte', () => {
  let service: Corte;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Corte);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
