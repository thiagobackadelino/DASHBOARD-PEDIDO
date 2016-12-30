 import { Injectable, EventEmitter } from '@angular/core';
 
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Injectable() 
export class OrdensService {
 
    private _id: string; 
    data: any = [];

    static emitirOrdemSelecionada = new EventEmitter<string>();

    constructor( public dataService: DataServiceOrdem ){ 
    }
 

    initCall(){
      return this.dataService.initCall();
    }
 
 

    addItem(ordem: Ordem){   
        ordem._id = new Date().toISOString();
        this.dataService.addDocument(ordem);  
        }

     getOrdens() { 
        return this.dataService.getOrdens();
    }

    onSelect(ordem){ 
        OrdensService.emitirOrdemSelecionada.emit(ordem);
    }



}