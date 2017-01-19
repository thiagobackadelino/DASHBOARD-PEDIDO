import { OrdensService } from './../../ordem/ordens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Ordem } from './../../ordem/ordem';
import { DataServiceOrdem } from './../../services/data.service.ordem';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {


  @Input() ordem: any; 

  constructor(
    private ordensService: OrdensService,
    private router: Router) {
  }


  adicionarItens(ordem) {
    //this.ordensService.onSelect(ordem);
    this.router.navigate(['/ordem-item-modal/' + ordem._id]);
  }

  ngOnDestroy() {
    this.ordem; 
  }

  alterarStatusDoItem(ordemid, itemid) {
    this.ordensService.alterarStatusDoItem(ordemid, itemid);
  }

  getQuantidadeMaiorQueZero(itens) {
    var a = 0;
    for (var x in itens) {
      a = a + Number(itens[x].quantidadeSolicitada);
    } if (a > 0) {
      return true;
    } else {
      return false
    }
  }

  excluirOrdem(id) {
    this.ordensService.excluirOrdem(id);
  }

  incluirQuantidadeDePessoas($event, ordemid) {
    this.ordensService.incluirQuantidadeDePessoas($event, ordemid);
  }


  incluirMovimentacao(valor) {
    this.router.navigate(['/caixa-incluir-movimentacao/' + valor]);
  }

  alterarStatus(id, status) {
    this.ordensService.alterarStatus(id, status);
  }

  alterarDelivery(id) {
    this.ordensService.alterarDelivery(id);
  }

  alterarPrioridade(id) {
    this.ordensService.alterarPrioridade(id);
  }

  alterarObservacao(ordemid, valor) {
    this.ordensService.salvarObservacao(ordemid, valor);
  }

    getQuantidade(itens){
    var a = 0;
    for (var x in itens) {
      a = a + Number(itens[x].quantidadeSolicitada);
    }
    return a;
  }

  getValorTotal(itens) {
    var a = 0;
    for (var x in itens) {
      a = a + (Number(itens[x].valor) * Number(itens[x].quantidadeSolicitada));
    }
    return a;
  }

}
