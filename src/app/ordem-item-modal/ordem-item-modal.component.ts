import { Component, OnInit,Input } from '@angular/core';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';
import { OrdemItemSelecaoComponent } from '../ordem-item-selecao/ordem-item-selecao.component';

@Component({
  selector: 'app-ordem-item-modal',
  templateUrl: './ordem-item-modal.component.html',
  styleUrls: ['./ordem-item-modal.component.css']
})
export class OrdemItemModalComponent implements OnInit {
 
  ordem = Ordem;

  constructor(private ordensService : OrdensService,private ordemItemSelecaoComponent:OrdemItemSelecaoComponent) {
    OrdensService.emitirOrdemSelecionada.subscribe(
      ordemSelecionada => this.ordem = ordemSelecionada
    ); 
   }

  ngOnInit() {

  }

  editarItem(id){ 
    this.ordensService.editarItem(id);
  }
 

}
