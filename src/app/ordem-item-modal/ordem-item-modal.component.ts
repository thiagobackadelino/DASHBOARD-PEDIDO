import { Component, OnInit,Input } from '@angular/core';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';

@Component({
  selector: 'app-ordem-item-modal',
  templateUrl: './ordem-item-modal.component.html',
  styleUrls: ['./ordem-item-modal.component.css']
})
export class OrdemItemModalComponent implements OnInit {
 
  ordem = Ordem;

  constructor(private ordensService : OrdensService) {
    OrdensService.emitirOrdemSelecionada.subscribe(
      ordemSelecionada => this.ordem = ordemSelecionada
    );
   }

  ngOnInit() {

  }

  editarItem(){
    this.ordensService.editarItem();
  }

}
