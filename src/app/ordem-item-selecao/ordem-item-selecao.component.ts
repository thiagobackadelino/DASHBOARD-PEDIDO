import { Component, OnInit } from '@angular/core';

import { ItensService } from '../itens/itens.service';

@Component({
  selector: 'app-ordem-item-selecao',
  templateUrl: './ordem-item-selecao.component.html',
  styleUrls: ['./ordem-item-selecao.component.css']
})
export class OrdemItemSelecaoComponent implements OnInit {

  itens: any = []; 

  constructor(private itensService: ItensService) { }

  ngOnInit() { 
     this.itensService.initCall();
  }

  ngAfterViewInit() { 
      this. getItens();
  }

    getItens() {
    this.itensService.getItens().then((data) => {
      this.itens = data;   
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    });

  }



}
