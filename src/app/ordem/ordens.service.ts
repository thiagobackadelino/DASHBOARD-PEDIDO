 import { Injectable, EventEmitter } from '@angular/core';
 
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Injectable() 
export class OrdensService {
 
    private _id: string; 
    data: any = []; 
    listaDeItensDoPedido: any = [];
    comparativo: number = 0;
    ordem : Ordem;

    static emitirOrdemSelecionada = new EventEmitter<Ordem>(); 
    static emitirOrdemAlterada = new EventEmitter<Ordem>(); 

    constructor( public dataService: DataServiceOrdem ){ 
    }
 

    initCall(){
      return this.dataService.initCall();
    }
 
 

    addItem(ordem: Ordem){   
        ordem._id = new Date().toISOString() + Math.random();
        ordem.data = new Date(); 
        ordem.status = "0";
        this.dataService.addDocument(ordem);  
        }

     getOrdens() { 
        return this.dataService.getOrdens();
    }

    onSelect(ordem){  
        //console.log(ordem);
        OrdensService.emitirOrdemSelecionada.emit(ordem);
    }

    montarPedido(event,item){ 
         //console.table(item);
         //console.log(event); 
         item.quantidade = event.novoValor;
        if(!this.existeItemNaListe(this.listaDeItensDoPedido )){
             if(item.quantidade > 0){
            this.listaDeItensDoPedido.push(item); 
             }
        }else if(this.existeItemNaListe(this.listaDeItensDoPedido )){
                if(this.existeDeterminadoItemNaLista(item)){
                     console.log("existe " + item.nome);
                     if(item.quantidade <= 0 ){
                        this.removeItensZeradosDaLista(item);
                     }else{
                             item = item.quantidade;
                     }
                   
                }else{
                      console.log("nao existe "+ item.nome);
                    if(item.quantidade > 0){
                    this.listaDeItensDoPedido.push(item); 
                    }
                } 
        } 
             console.table(this.listaDeItensDoPedido); 
    }

    existeItemNaListe(listaDeItensDoPedido){
        if(listaDeItensDoPedido.length <= 0 ){
            return false;
        } else{
            return true;
        }  
    }

    existeDeterminadoItemNaLista(item){

        for(var x in this.listaDeItensDoPedido){
            if(this.listaDeItensDoPedido[x]._id == item._id){
                 this.comparativo ++;
            } 
        }
            if(this.comparativo >= 1){
                this.comparativo = 0;
                return true; 
            }else{
                return false;
            } 
    }

    removeItensZeradosDaLista(item){ 
         for(var x in this.listaDeItensDoPedido){
            if(this.listaDeItensDoPedido[x]._id == item._id){
                this.listaDeItensDoPedido.splice(x,1);
            } 
        }
                  
             
    }

    editarItem(id){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0]; 
                  // console.log( this.data); 
                   // console.log(JSON.stringify(this.data)); 
                    this.data.itens = this.listaDeItensDoPedido; 
               this.dataService.addDocument(this.data); 
               OrdensService.emitirOrdemAlterada.emit(this.data);
            }).catch((ex) => {
              console.error('Error fetching ', ex);
            }); 
        }  
       
     getDocumentById(id: string){           
      return this.dataService.getDocumentById(id);
    }

    
    alterarStatus(id,status){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0]; 
                   console.log( status);  
                    this.data.status = status; 
                     console.log(JSON.stringify(this.data)); 
               this.dataService.addDocument(this.data);  
               OrdensService.emitirOrdemAlterada.emit(this.data);
            }).catch((ex) => {
              console.error('Error fetching ', ex);
            }); 
        }  

}