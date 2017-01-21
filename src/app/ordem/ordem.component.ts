import {
  Component, OnInit, Output, Input,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.component.html',
  styleUrls: ['./ordem.component.css']
})
export class OrdemComponent implements OnInit {

  ordens: any = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataServiceOrdem) {
  }

  ngOnInit() {
    // this.getOrdensDoDiaAtualPQ(); 
    //this.change();
  }

  ngAfterViewInit() {
    this.getOrdensDoDiaAtualPQ();
  }


  ngOnDestroy() {
    //console.log("ngOnDestroy");
    // this.dataService.clearData();
  }

  getOrdensDoDiaAtualPQ() {
    this.dataService.getOrdensDoDiaAtualPQ().then((data) => {
      this.ordens = data;
    }).catch((ex) => {
      console.error('Error fetching getOrdensDoDiaAtualTQ', ex);
    });
  }

  adicionarItens(ordem) {
    //this.dataService.onSelect(ordem);
    this.router.navigate(['/ordem-item-modal/' + ordem._id]);
  }

  alterarStatusDoItem(ordemid, itemid) {
    this.dataService.alterarStatusDoItemTQ(ordemid, itemid);
    this.change();
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
    this.change();
  }

  incluirQuantidadeDePessoas($event, ordemid) {
    this.dataService.incluirQuantidadeDePessoasTQ($event.novoValor, ordemid);
    this.change();
  }

  incluirMovimentacao(valor) {
    this.router.navigate(['/caixa-incluir-movimentacao/' + valor]);
  }

  alterarStatus(id, status) {
    this.dataService.alterarStatusIdTQ(id, status);
    this.change();
  }

  alterarDelivery(id) {
    this.dataService.alterarDeliveryIdTQ(id);
    this.change();

  }

  alterarPrioridade(id) {
    this.dataService.alterarPrioridadeIdTQ(id);
    this.change();
  }

  alterarObservacao(ordemid, valor) {
    this.dataService.alterarObservacaoIdTQ(ordemid, valor);
    this.change();
  }

  getQuantidade(itens) {
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

  change() {
    this.ordens = this.dataService.data;
  }

}
