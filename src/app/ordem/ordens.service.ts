import { ItensService } from './../itens/itens.service';
import { Injectable,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordem } from './ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Injectable()
export class OrdensService {

    private _id: string;
    data: any = [];
    listaDeItensDoPedido: any = [];
    comparativo: number = 0;
    ordem: Ordem; 
    constructor(
        public dataService: DataServiceOrdem,
        private route: ActivatedRoute,
        private router: Router) {
    }


    initCall() {
        return this.dataService.initCall();
    }



    addOrdem(ordem: Ordem) {
        ordem._id = "" + this.getDiaAtual() + this.getHoraAtual() + (Math.random() * 10);
        ordem.data = this.getDiaAtual();
        ordem.hora = this.getHoraAtual();
        ordem.status = "ABERTA";
        this.dataService.addDocument(ordem);
    }

    getOrdensDoDiaAtualPQ() {
        return this.dataService.getOrdensDoDiaAtualPQ();
    }

    editarItem(id, itensSelecionados) {
        this.getDocumentById(id).then((data) => {
            this.data = data[0];
            if (this.data.itens.length == 0) {
                this.data.itens = itensSelecionados;
            } else {
                for (var x in itensSelecionados) {
                    for (var y in this.data.itens) {
                        if (this.data.itens[y] != null) {
                            if (!this.existeDeterminadoItemNaLista(itensSelecionados[x], this.data.itens)) {
                                //console.log("nao existe -- " + itensSelecionados[x].nome)
                                if (itensSelecionados[x].quantidadeSolicitada > 0) {
                                    this.data.itens.push(itensSelecionados[x]);
                                }
                            }
                            if (this.existeDeterminadoItemNaLista(itensSelecionados[x], this.data.itens)) {
                                if (this.data.itens[y]._id == itensSelecionados[x]._id) {
                                    if (itensSelecionados[x].quantidadeSolicitada > 0) {
                                        this.data.itens[y].quantidadeSolicitada = itensSelecionados[x].quantidadeSolicitada;
                                    } else if (itensSelecionados[x].quantidadeSolicitada == 0) {
                                        this.data.itens.splice(y, 1);
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

    getDocumentById(id: string) {
        return this.dataService.getDocumentById(id);
    }

    alterarStatusDoItem(ordemid, itemid) {
            this.dataService.alterarStatusDoItemTQ(ordemid, itemid);
    }

    existeDeterminadoItemNaLista(item, itensSelecionados) {
        for (var x in itensSelecionados) {
            if (itensSelecionados[x]._id == item._id) {
                this.comparativo++;
            }
        }
        if (this.comparativo >= 1) {
            this.comparativo = 0;
            return true;
        } else {
            return false;
        }
    }

    incluirQuantidadeDePessoas($event, ordemid) {
        this.getDocumentById(ordemid).then((data) => {
            this.data = data[0];
            this.data.quantidadePessoas = $event.novoValor;
            //this.dataService.addDocument(this.data);
            this.dataService.addDocument(this.data);
        }).catch((ex) => {
            console.error('Error fetching  alterarPrioridade', ex);
        });
    }

    salvarObservacao(id, obs) {
        this.dataService.alterarObservacaoIdTQ(id, obs);
    }

    alterarDelivery(id) {
        this.dataService.alterarDeliveryIdTQ(id);
    }

    alterarPrioridade(id) {
        this.dataService.alterarPrioridadeIdTQ(id);
    }

    alterarStatus(id, status) {
        this.dataService.alterarStatusIdTQ(id, status);  
    }

    excluirOrdem(id) {
        this.dataService.excluirOrdemTQ(id);
    }

    getDiaAtual() {
        let date = new Date();
        return date.toISOString().substring(0, 10);
    }

    getHoraAtual() {
        return Date.now();
    }

}