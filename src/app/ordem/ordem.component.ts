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
import { OrdensService } from './ordens.service';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.component.html',
  styleUrls: ['./ordem.component.css']
})
export class OrdemComponent implements OnInit {

  ordens: any = []; 


  constructor(
    private ordensService: OrdensService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataServiceOrdem) { 
  }

   ngOnInit() { 
  }

  ngAfterViewInit() { 
    this.getOrdensDoDiaAtualPQ();
  }
  
  ngOnDestroy() {  
    //console.log("ngOnDestroy");
   // this.ordensService.clearData();
  }

  getOrdensDoDiaAtualPQ() { 
    this.ordensService.getOrdensDoDiaAtualPQ().then((data) => {
      this.ordens = data; 
    }).catch((ex) => {
      console.error('Error fetching getOrdensDoDiaAtualPQ', ex);
    });
  }

  adicionarItens(ordem) {
    //this.ordensService.onSelect(ordem);
    this.router.navigate(['/ordem-item-modal/' + ordem._id]);
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
