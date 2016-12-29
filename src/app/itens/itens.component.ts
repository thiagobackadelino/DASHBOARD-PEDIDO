import { Component, OnInit,Output, EventEmitter} from '@angular/core';
 
import { Item } from './item';
import { ItensService } from './itens.service';

@Component({ 
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  itens: any = [];
  item  : any = {}; 
  selectedItem :any = []
  @Output() mudouValor = new EventEmitter();
  classe : string ;

  constructor(private itensService: ItensService) { 
         this.novoItem();
         this.novoSelected();
   }

  ngOnInit() { 
     this.itensService.initCall();
  }
 
  ngAfterViewInit() { 
      this. getItens();
  }


   addData(event) { 
    event.preventDefault();
    if(this.selectedItem){
      this.item._id = this.selectedItem._id;
    }
     this.itensService.addItem(this.item);
     this.itens = this.getItens();
     this.novoItem();
     this.novoSelected();
     this.mudouValor.emit({novoValor: this.classe = "alert-success"});
  }

  novoItem() {
    this.item  = new Item(); 
    this.mudouValor.emit({novoValor: this.classe = ""});
  }

  novoSelected() {
    this.selectedItem  = new Item(); 
  }

  getItens() {
    this.itensService.getItens().then((data) => {
      this.itens = data;   
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    });

  }

    onSelect(item: any): void {
      this.selectedItem = item;
    }

  get diagnostic() { return JSON.stringify(this.item); }

}
