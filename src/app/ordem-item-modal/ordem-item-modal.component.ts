import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';
import { ItensService } from '../itens/itens.service';

@Component({
  selector: 'app-ordem-item-modal',
  templateUrl: './ordem-item-modal.component.html',
  styleUrls: ['./ordem-item-modal.component.css']
})
export class OrdemItemModalComponent implements OnInit {
  id: string;
  inscricao: Subscription;
  ordem = Ordem;
  public valorInicial: number = 0;
  itens: any = [];
  itensOrdem: any = [];

  constructor(
    private ordensService: OrdensService,
    private itensService: ItensService,
    private route: ActivatedRoute,
    private router: Router) {
    //this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
  }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id != null) {
          this.ordensService.getDocumentById(this.id).then((data) => {
            this.ordem = data[0];
            this.getItens(this.ordem);
          }).catch((ex) => {
            console.error('Error fetching getItens', ex);
          });
        }
      }
    );
  }



  getItens(ordem) {
    this.itensService.getItens().then((data) => { 
      for (var x in data) {
        for (var y in ordem.itens) {
          // console.log(" x ---"+ordem.itens[x].nome +"----- y "+data[y].nome);
          if (ordem.itens[y].nome != data[x].nome) {
            // console.log(" xa ---"+ordem.itens[y].nome +"----- ya "+data[x].nome);
            //console.log(" Y ---"+ordem.itens[x].nome);

          } else if (ordem.itens[y].nome == data[x].nome) {
            //console.log(" xb ---"+ordem.itens[y].nome +"----- yb "+data[x].nome);
            data[x].quantidade = ordem.itens[y].quantidade;
          }
        }
      }

      this.itens = data; 
    }).catch((ex) => {
      console.error('Error fetching getItens', ex);
    });
  }



  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
