import { TestBed } from '@angular/core/testing';

import { BearerInterceptorService } from './bearer-interceptor.service';

describe('BearerInterceptorService', () => {
  let service: BearerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BearerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
