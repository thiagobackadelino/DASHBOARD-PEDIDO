import { Injectable, EventEmitter } from '@angular/core';
 
import { Item } from './item';
import { DataServiceItem } from '../services/data.service.item';

@Injectable() 
export class ItensService {

    //private itens: Item[] = [];
    private _id: string; 
    data: any = [];
    constructor( public dataService: DataServiceItem ){ 
    }

    getItens() {
           
        return this.dataService.getDocumentos();
    }

    initCall(){
      return this.dataService.initCall();
    }
 
    getDocumentById(id: string){           
      return this.dataService.getDocumentById(id);
    }

    addItem(item: any){  

         if(item._id){           
             this.getDocumentById(item._id).then((data) => {
               this.data = data[0]; 
               for(var x in this.data){ 
                 if(item[x]){ 
                    this.data[x] = item[x];
                 }
               } 
               data[0] = this.data; 
               this.dataService.addDocument(this.data);
            }).catch((ex) => {
              console.error('Error fetching ', ex);
            }); 
        } 
        
        else{  
        item._id = new Date().toISOString();
        this.dataService.addDocument(item);  
        }
       
    }


}