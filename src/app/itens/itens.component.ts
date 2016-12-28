import { Component, OnInit } from '@angular/core';
 
import { Item } from './item';
import { ItensService } from './itens.service';

@Component({ 
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  itens: any = [];
  item  : any = []; 
  selectedItem :any = []

  constructor(private itensService: ItensService) { 
         this.novoItem();
         this.novoSelected();
   }

  ngOnInit() {
    this.getItens() ;
  }
 

  onSubmit() { 
    
    if(this.selectedItem){
      this.item._id = this.selectedItem._id;
    }
     this.itensService.addItem(this.item);
     this.novoItem();
     this.novoSelected();
  }

  novoItem() {
    this.item  = new Item(); 
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
