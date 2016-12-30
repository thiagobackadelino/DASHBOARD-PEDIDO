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
  
  constructor() {}

  ngOnInit() { 
  }

}
