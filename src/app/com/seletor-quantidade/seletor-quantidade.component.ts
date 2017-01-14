import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({ 
  selector: 'app-seletor-quantidade',
  templateUrl: './seletor-quantidade.component.html',
  styleUrls: ['./seletor-quantidade.component.css']
})
export class SeletorQuantidadeComponent  {

  @Input() valor : number = 0;


  @Output() mudouValor = new EventEmitter();
 

  constructor() {  
   }

  decrementa(){ 
    this.valor--;
    this.mudouValor.emit({novoValor: this.valor}); 
  }

  incrementa(){
    this.valor++;
    this.mudouValor.emit({novoValor: this.valor}); 
  }

  ngOnDestroy(){
    this.valor;
    this.mudouValor;
  }
}
