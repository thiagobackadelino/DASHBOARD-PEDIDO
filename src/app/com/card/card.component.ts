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
    private dataService: DataServiceOrdem,
    private router: Router) {
  }


  adicionarItens(ordem) {
    //this.dataService.onSelect(ordem);
    this.router.navigate(['/ordem-item-modal/' + ordem._id]);
  }

  ngOnDestroy() {
    this.ordem; 
  }

  alterarStatusDoItem(ordemid, itemid) {
    this.dataService.alterarStatusDoItemTQ(ordemid, itemid);
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
    this.dataService.excluirOrdemTQ(id);
  }

  incluirQuantidadeDePessoas($event, ordemid) {
    this.dataService.incluirQuantidadeDePessoasTQ($event, ordemid);
  }


  incluirMovimentacao(valor) {
    this.router.navigate(['/caixa-incluir-movimentacao/' + valor]);
  }

  alterarStatus(id, status) {
    this.dataService.alterarStatusIdTQ(id, status);
  }

  alterarDelivery(id) {
    this.dataService.alterarDeliveryIdTQ(id);
  }

  alterarPrioridade(id) {
    this.dataService.alterarPrioridadeIdTQ(id);
  }

  alterarObservacao(ordemid, valor) {
    this.dataService.alterarObservacaoIdTQ(ordemid, valor);
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
