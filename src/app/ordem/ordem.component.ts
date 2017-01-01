import { Component, OnInit,Output, EventEmitter,Input} from '@angular/core';
 
import { Ordem } from './ordem';
import { OrdensService } from './ordens.service';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.component.html',
  styleUrls: ['./ordem.component.css']
})
export class OrdemComponent implements OnInit { 
  
  @Input('n') ordem  :  Ordem[] ; 

  constructor(private ordensService : OrdensService) {}

  ngOnInit() { 
  }

  onSelect(ordem){
    //alert('oi'+ordem.nome);
    this.ordensService.onSelect(ordem);
  }

  alterarStatus(id,status){
    //alert(id+""+status);
      this.ordensService.alterarStatus(id,status);
  }

  getStatusAberto(status){   
   if(status = "0"){return true;} 
   else {return false;}
  }

  getStatusProgresso(status){   
   if(status = "2"){return true;} 
   else {return false;}
  }

   getStatusFechado(status){   
   if(status = "3"){return true;} 
   else {return false;}
  }

  getQuantidade(itens){
     var a = 0 ;
    for(var x in itens){ 
      a = a + Number(itens[x].quantidade);
    } 
    return a;
  } 

    getValorTotal(itens){
     var a = 0 ;
    for(var x in itens){ 
      a = a + (Number(itens[x].valor)*Number(itens[x].quantidade));
    } 
    return a;
  }

    getQuantidadeMaiorQueZero(itens){
     var a = 0 ;
    for(var x in itens){ 
      a = a + Number(itens[x].quantidade);
    } if(a > 0){
      return true;
    }else{
      return false
    } 
  } 

}
