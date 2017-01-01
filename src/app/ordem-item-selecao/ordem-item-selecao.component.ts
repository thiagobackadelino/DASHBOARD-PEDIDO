import { OrdensService } from './../ordem/ordens.service';
import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, Validators ,ReactiveFormsModule,FormGroup ,FormControl} from '@angular/forms';

import { ItensService } from '../itens/itens.service';
import { Ordem } from '../ordem/ordem';

@Component({
  selector: 'app-ordem-item-selecao',
  templateUrl: './ordem-item-selecao.component.html',
  styleUrls: ['./ordem-item-selecao.component.css']
})
export class OrdemItemSelecaoComponent implements OnInit {

  itens: any = [];  
  public valorInicial : number = 0;     

  constructor(private itensService: ItensService, private ordensService: OrdensService,private formBuilder: FormBuilder) {

   }

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

  montarPedido(event,item){
    this.ordensService.montarPedido(event,item); 
  } 


}
