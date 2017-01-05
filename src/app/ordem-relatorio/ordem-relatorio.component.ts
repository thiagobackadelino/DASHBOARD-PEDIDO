import { ItensService } from './../itens/itens.service';
import { Component, OnInit } from '@angular/core';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';

@Component({
  selector: 'app-ordem-relatorio',
  templateUrl: './ordem-relatorio.component.html',
  styleUrls: ['./ordem-relatorio.component.css']
})
export class OrdemRelatorioComponent implements OnInit {

  ordens: any = [];

  constructor(private ordensService: OrdensService) { }

  ngOnInit() {
    //this.ordensService.initCall();
    //this.getValorTotal(this.ordens);
      console.log("this.ordens");
  }

    ngAfterViewInit() { 
      this. getOrdens();
      //this.getValorTotal(this.ordens.itens)
  }

    getOrdens() {
    this.ordensService.getOrdens().then((data) => {
      this.ordens = data;   
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    }); 
  }

    getValorTotal() {
       var a = 0; 
      if(this.ordens.length > 0){ 
        for(var y in this.ordens){ 
        for (var x in this.ordens[y].itens) { 
          a = a +  (Number(this.ordens[y].itens[x].valor)  * Number(this.ordens[y].itens[x].quantidade)) ;
        }
       
        }
      } 
       return a;
  }

      getTotalItens() {
       var a = 0; 
      if(this.ordens.length > 0){ 
        for(var y in this.ordens){ 
        for (var x in this.ordens[y].itens) { 
          a = a +  Number(this.ordens[y].itens[x].quantidade)   ;
        }
       
        }
      } 
       return a;
  }

}
