import { TestBed } from '@angular/core/testing';

import { ManejadorAudioService } from './manejador-audio.service';

describe('ManejadorAudioService', () => {
  let service: ManejadorAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejadorAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
