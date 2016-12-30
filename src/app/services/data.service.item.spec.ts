/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataServiceItem } from './data.service.item';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServiceItem]
    });
  });

  it('should ...', inject([DataServiceItem], (service: DataServiceItem) => {
    expect(service).toBeTruthy();
  }));
});
