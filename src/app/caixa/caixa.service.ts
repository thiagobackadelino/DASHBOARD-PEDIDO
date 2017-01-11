import { DataServiceCaixa } from './../services/data.service.caixa';
import { Caixa } from './caixa';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class CaixaService {

    caixa: Caixa;
    data: any = [];
    constructor(private dataService: DataServiceCaixa) {

    }

    addCaixa(doc: Caixa) {
        doc._id = this.getIdCaixaDiaAtual();
        this.dataService.existeCaixaDiaAtual(doc._id).then((data) => {
            if (data == true) {
            } else if (data == false) { 
                doc.dataAbertura = new Date();
                doc.observacao = doc.observacao;
                doc.movimentacoes = [];
                this.dataService.addDocument(doc);
            }

        }).catch((ex) => {
            console.error('Error fetching users', ex);
        });
    }

    registrarMovimentacao(doc: any) {
        doc._id = new Date().toISOString() + Math.random();
        doc.data = new Date();
        this.dataService.existeCaixaDiaAtual(this.getIdCaixaDiaAtual()).then((data) => {
            if (data == true) {
                this.getCaixaDiaAtual().then((data) => { 
                    let caixa: any = {};
                    caixa = data;
                    caixa.movimentacoes.push(doc);
                    this.dataService.addDocument(caixa);
                }).catch((ex) => {
                    console.error('Error fetching getCaixaDiaAtual', ex);
                });
            } else if (data == false) {
            }

        }).catch((ex) => {
            console.error('Error fetching users', ex);
        });
    }

    fecharCaixa(caixa) { 
        this.getCaixaDiaAtual().then((data) => { 
            let caixa: any = {};
            caixa = data;
            caixa.dataFechamento = new Date();
            this.dataService.addDocument(caixa);
        }).catch((ex) => {
            console.error('Error fetching fecharCaixa', ex);
        });

    }

    getCaixaDiaAtual() {
        return this.dataService.getCaixaDiaAtual(this.getIdCaixaDiaAtual());
    } 

    getIdCaixaDiaAtual() {
        let date = new Date();
        let id = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
        return id;
    }

}