import { TestBed } from '@angular/core/testing';

import { FavButtonService } from './fav-button.service';

describe('FavButtonService', () => {
  let service: FavButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
