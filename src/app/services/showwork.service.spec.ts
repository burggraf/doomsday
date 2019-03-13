import { TestBed } from '@angular/core/testing';

import { ShowworkService } from './showwork.service';

describe('ShowworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowworkService = TestBed.get(ShowworkService);
    expect(service).toBeTruthy();
  });
});
