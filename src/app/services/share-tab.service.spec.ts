import { TestBed } from '@angular/core/testing';

import { ShareTabService } from './share-tab.service';

describe('ShareTabService', () => {
  let service: ShareTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
