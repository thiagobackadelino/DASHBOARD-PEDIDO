import { CaixaService } from './caixa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Caixa } from './caixa'

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  caixa: any = {};

  constructor(private caixaService: CaixaService,
    private router: Router) { }

  ngOnInit() {
    this.getCaixaDiaAtual();
    this.existeCaixaDiaAtual();

  }

  addCaixa() {
    this.caixaService.addCaixa(this.caixa);
    this.getCaixaDiaAtual();
    this.existeCaixaDiaAtual();
  }

  getCaixaDiaAtual() {
    this.caixaService.getCaixaDiaAtual().then((data) => {
      this.caixa = data;
    }).catch((ex) => {
      console.error('Error fetching getCaixaDiaAtual', ex);
    });
  }

  existeCaixaDiaAtual() {
    this.caixaService.existeCaixaDiaAtual().then((data) => {
      this.caixa.aberto = data;
    }).catch((ex) => {
      console.error('Error fetching existeCaixaDiaAtual', ex);
    });
  }

  incluirMovimentacao(id) {
    this.router.navigate(['/caixa-incluir-movimentacao/']);
  }

}
