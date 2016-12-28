import { Injectable, EventEmitter } from '@angular/core';
 
import { Item } from './item';
import { DataService } from '../services/data.service';

@Injectable() 
export class ItensService {

    //private itens: Item[] = [];
    private _id: string; 
    data: any = [];
    constructor( public dataService: DataService ){
       //console.log('CursosService');
    }

    getItens() {
           
        return this.dataService.getDocumentos();
    }
 
    getDocumentById(id: string){           
      return this.dataService.getDocumentById(id);
    }

    addItem(item: any){  

         if(item._id){          
           console.log(item._id);
             this.getDocumentById(item._id).then((data) => {
               this.data = data[0];
               /*console.table(  item ); // item de retorno 
               console.table(  this.data ); // item de retorno 
               console.table(   ); // item com alteracao
               console.log(JSON.stringify(item));
               console.log(JSON.stringify(this.data));
               console.log(Object.keys(item));
               console.log(Object.keys(this.data));*/
               for(var x in this.data){ 
                 if(item[x]){
                   //console.log(x + "-- "+item[x]);
                    this.data[x] = item[x];
                 }
               }  
               data[0] = this.data;
               console.table(   data);    // item com alteracao
               this.dataService.addDocument(this.data);
            }).catch((ex) => {
              console.error('Error fetching ', ex);
            }); 
        } 
        
        else{ 
        let date = new Date();
        item._id = "d"+date.getDay()+"m"+date.getMonth()+"a"+date.getFullYear()+"h"+date.getHours()+"m"+date.getMinutes()+"ms"+date.getMilliseconds();
        this.dataService.addDocument(item);  
        }
    }


}