/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaixaIncluirMovimentacaoComponent } from './caixa-incluir-movimentacao.component';

describe('CaixaIncluirMovimentacaoComponent', () => {
  let component: CaixaIncluirMovimentacaoComponent;
  let fixture: ComponentFixture<CaixaIncluirMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaIncluirMovimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaIncluirMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
