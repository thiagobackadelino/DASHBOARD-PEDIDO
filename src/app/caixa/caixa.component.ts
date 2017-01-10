import { Movimentacao } from './../caixa-incluir-movimentacao/movimentacao';
import { CaixaService } from './caixa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Caixa } from './caixa'

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  caixa: any = {};
  movimentacao: Movimentacao;
  inscricao: Subscription;
  valor: string;

  constructor(private caixaService: CaixaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
 this.movimentacao = new Movimentacao(); 
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.valor = params['valor'];

        if (this.valor != null) {
          console.log(this.valor);
          this.movimentacao.valor = Number(this.valor);
        }
      }
    ); 
    this.getCaixaDiaAtual(); 
  }

  ngAfterViewInit() {
    this.getCaixaDiaAtual(); 
  }

  addCaixa() {
    this.caixaService.addCaixa(this.caixa);
    this.getCaixaDiaAtual(); 
  }

  fecharCaixa(){
    this.caixaService.fecharCaixa(this.caixa);
  }

  getCaixaDiaAtual() {
    this.caixaService.getCaixaDiaAtual().then((data) => {
      this.caixa = data;
    }).catch((ex) => {
      console.error('Error fetching getCaixaDiaAtual', ex);
    });
  }
 

  incluirMovimentacao(id) {
    this.router.navigate(['/caixa-incluir-movimentacao/']);
  }

  registrarMovimentacao() {
    this.caixaService.registrarMovimentacao(this.movimentacao);
    this.getCaixaDiaAtual(); 
  }
 

}
