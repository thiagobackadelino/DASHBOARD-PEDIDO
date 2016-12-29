import { Injectable, EventEmitter } from '@angular/core';
 
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Injectable() 
export class OrdensService {
 
    private _id: string; 
    data: any = [];
    constructor( public dataService: DataServiceOrdem ){ 
    }
 

    initCall(){
      return this.dataService.initCall();
    }
 
 

    addItem(item: any){  
        item._id = new Date().toISOString();
        this.dataService.addDocument(item);  
        }

     getOrdens() { 
        return this.dataService.getOrdens();
    }



}