import { Component, OnInit, Output, EventEmitter, Input, 
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
    this.getOrdens();
  }

  ngAfterViewInit() { 
      this.getOrdens();
  }

  getOrdens() {
    this.ordensService.getOrdens().then((data) => {
      this.ordens = data;   
    }).catch((ex) => {
      console.error('Error fetching getOrdens', ex);
    }); 
  }

  onSelect(ordem) {
    //this.ordensService.onSelect(ordem);
    this.router.navigate(['/ordem-item-modal/' + ordem._id]);
  }

  alterarStatus(id, status) { 
    this.ordensService.alterarStatus(id, status);
    this.getOrdens();
  }

  alterarDelivery(id) {
    this.ordensService.alterarDelivery(id); 
    this.getOrdens();
  }

  alterarPrioridade(id) {
    this.ordensService.alterarPrioridade(id);
    this.getOrdens(); 
  }

  alterarStatusDoItem(ordemid,itemid) {  
    this.ordensService.alterarStatusDoItem(ordemid,itemid);
    this.getOrdens(); 
  }


  getQuantidade(itens) {
    var a = 0;
    for (var x in itens) {
      a = a + Number(itens[x].quantidade);
    }
    return a;
  }

  getValorTotal(itens) {
    var a = 0;
    for (var x in itens) {
      a = a + (Number(itens[x].valor) * Number(itens[x].quantidade));
    }
    return a;
  }

  getQuantidadeMaiorQueZero(itens) {
    var a = 0;
    for (var x in itens) {
      a = a + Number(itens[x].quantidade);
    } if (a > 0) {
      return true;
    } else {
      return false
    }
  }
  
  excluirOrdem(id){
    this.ordensService.excluirOrdem(id);
    this.getOrdens();
  }

  incluirQuantidadeDePessoas($event,ordemid){ 
    this.ordensService.incluirQuantidadeDePessoas($event,ordemid);
    this.getOrdens();
  }
  
  salvarObservacao(ordemid,valor){ 
    this.ordensService.salvarObservacao(ordemid,valor);
    this.getOrdens();
  }

    incluirMovimentacao(id) {
    this.router.navigate(['/caixa-incluir-movimentacao/'+id]);
  }

}
