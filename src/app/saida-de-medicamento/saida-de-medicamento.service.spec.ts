import { TestBed } from '@angular/core/testing';

import { SaidaDeMedicamentoService } from './saida-de-medicamento.service';

describe('SaidaDeMedicamentoService', () => {
  let service: SaidaDeMedicamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidaDeMedicamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
