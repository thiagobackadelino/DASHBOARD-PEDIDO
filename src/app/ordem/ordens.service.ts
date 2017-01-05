import { ItensService } from './../itens/itens.service';
 import { Injectable, EventEmitter } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Injectable() 
export class OrdensService {
 
    private _id: string; 
    data: any = []; 
    listaDeItensDoPedido: any = [];
    comparativo: number = 0;
    ordem : Ordem;
  

    constructor( 
        public dataService: DataServiceOrdem,
    private route: ActivatedRoute,
    private router: Router ){ 
    }
 

    initCall(){
      return this.dataService.initCall();
    }
 
 

    addItem(ordem: Ordem){   
        ordem._id = new Date().toISOString() + Math.random();
        ordem.data = new Date(); 
        ordem.status = "0";
        ordem.delivery = true;
        ordem.prioridade = false;
        this.dataService.addDocument(ordem);  
        }

     getOrdens() { 
        return this.dataService.getOrdens();
    }
 
    editarItem(id,itensSelecionados){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0];  
                    if(this.data.itens.length == 0){    
                        this.data.itens = itensSelecionados; 
                    }else{ 
            for(var x in itensSelecionados){
                for(var y in this.data.itens){
             if(this.data.itens[y] != null){
                    if(!this.existeDeterminadoItemNaLista(itensSelecionados[x],this.data.itens)){
                        console.log("nao existe -- "+itensSelecionados[x].nome)
                        this.data.itens.push(itensSelecionados[x]);
                    }
                    if(this.existeDeterminadoItemNaLista(itensSelecionados[x],this.data.itens)) { 
                        if(this.data.itens[y]._id == itensSelecionados[x]._id){
                            if(itensSelecionados[x].quantidade > 0){ 
                                this.data.itens[y].quantidade = itensSelecionados[x].quantidade;
                            }else if(itensSelecionados[x].quantidade == 0){ 
                                this.data.itens.splice(y,1);
                            }
                            
                                
                }
                    
                }
               }
             }
            } 
} 
                this.dataService.addDocument(this.data);
                itensSelecionados = [];  
                 this.router.navigate(['/home']);
            }).catch((ex) => {
              console.error('Error fetching  editarItem', ex);
            }); 
        }  
       
     getDocumentById(id: string){           
      return this.dataService.getDocumentById(id);
    }

    
    alterarStatus(id,status){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0]; 
                   //console.log( status);  
                    this.data.status = status; 
                     //console.log(JSON.stringify(this.data)); 
               this.dataService.addDocument(this.data);   
            }).catch((ex) => {
              console.error('Error fetching  alterarStatus', ex);
            }); 
        }  

    alterarDelivery(id){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0];  
                    if(this.data.delivery){
                        this.data.delivery = false;
                    }else  {
                        this.data.delivery = true;
                    } 
               this.dataService.addDocument(this.data);   
            }).catch((ex) => {
              console.error('Error fetching  alterarDelivery', ex);
            }); 
        } 
            existeDeterminadoItemNaLista(item,itensSelecionados){ 
        for(var x in  itensSelecionados){
            if( itensSelecionados[x]._id == item._id){
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

        alterarPrioridade(id){   
             this.getDocumentById(id).then((data) => {
               this.data = data[0];  
                    if(this.data.prioridade){
                        this.data.prioridade = false;
                    }else  {
                        this.data.prioridade = true;
                    } 
               this.dataService.addDocument(this.data);   
            }).catch((ex) => {
              console.error('Error fetching  alterarDelivery', ex);
            }); 
        } 
 

}