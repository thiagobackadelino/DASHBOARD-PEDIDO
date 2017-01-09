import { CaixaService } from './../caixa/caixa.service';
import { DataServiceCaixa } from './../services/data.service.caixa';
import { Movimentacao } from './movimentacao';
import { Caixa } from './../caixa/caixa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caixa-incluir-movimentacao',
  templateUrl: './caixa-incluir-movimentacao.component.html',
  styleUrls: ['./caixa-incluir-movimentacao.component.css']
})
export class CaixaIncluirMovimentacaoComponent implements OnInit {

  caixa: Caixa;
  movimentacao: Movimentacao;

  constructor(private dataService: CaixaService) { }

  ngOnInit() {
    this.movimentacao = new Movimentacao();
  }

  registrarMovimentacao(){
    console.table(this.movimentacao);
    this.dataService.registrarMovimentacao(this.movimentacao);
     
  }

}
