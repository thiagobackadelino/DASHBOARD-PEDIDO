/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataServiceOrdem } from './data.service.ordem';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServiceOrdem]
    });
  });

  it('should ...', inject([DataServiceOrdem], (service: DataServiceOrdem) => {
    expect(service).toBeTruthy();
  }));
});
