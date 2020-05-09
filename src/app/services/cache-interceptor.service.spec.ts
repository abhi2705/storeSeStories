import { TestBed } from '@angular/core/testing';

import { CacheInterceptorService } from './cache-interceptor.service';

describe('CacheInterceptorService', () => {
  let service: CacheInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
