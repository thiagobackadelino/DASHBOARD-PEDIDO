import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ItensService } from '../itens/itens.service';
import { Ordem } from '../ordem/ordem';
import { DataServiceOrdem } from '../services/data.service.ordem';

@Component({
  selector: 'app-ordem-item-selecao',
  templateUrl: './ordem-item-selecao.component.html',
  styleUrls: ['./ordem-item-selecao.component.css']
})
export class OrdemItemSelecaoComponent implements OnInit {
  counterValue = 0;
  @Input('n') itens: any = [];
  @Input('id') id: any;
  public valorInicial: number = 0;
  itensSelecionados: any = [];
  itemSelecionado: any;
  comparativo: number = 0;
  data: any = [];
  constructor(private itensService: ItensService, private dataService: DataServiceOrdem,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.itensService.initCall();
  }

  ngAfterViewInit() {
  }

  montarPedido(event, item) {
    //console.table(this.itensSelecionados);
    if (this.itensSelecionados.length == 0) {
      /*item.feito = false;*/
      item.quantidadeSolicitada = event.novoValor;
      this.itensSelecionados.push(item);
    } else {
      /*item.feito = false;*/
      item.quantidadeSolicitada = event.novoValor;
      // console.log(this.existeDeterminadoItemNaLista(item));
      if (!this.existeDeterminadoItemNaLista(item)) {
        if (item.quantidadeSolicitada == 0) {
        } else if (item.quantidadeSolicitada > 0) {
          this.itensSelecionados.push(item);
        }
      } else if (this.existeDeterminadoItemNaLista(item)) {
        if (item.quantidadeSolicitada == 0) {
        }
      }
    }
  }

  existeDeterminadoItemNaLista(item) {
    for (var x in this.itensSelecionados) {
      if (this.itensSelecionados[x]._id === item._id) {
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

  removeItemZeradoDaLista(item) {
    for (var x in this.itensSelecionados) {
      if (this.itensSelecionados[x]._id == item._id) {
        this.itensSelecionados.splice(x, 1);
      }
    }
  }


  editarItem(id) {
    //console.table(this.itensSelecionados);
    this.dataService.getDocumentById(id).then((data) => {
      this.data = data[0];
      if (this.data.itens.length == 0) {
        this.data.itens = this.itensSelecionados;
      } else {
        for (var x in this.itensSelecionados) {
          for (var y in this.data.itens) {
            if (this.data.itens[y] != null) {
              if (!this.existeDeterminadoItemNaLista(this.data.itens[y])) {
                // console.log("nao existe -- " + this.itensSelecionados[x].nome)
                if (this.itensSelecionados[x].quantidadeSolicitada > 0) {
                  this.data.itens.push(this.itensSelecionados[x]);
                }
              }
              if (this.existeDeterminadoItemNaLista(this.data.itens[y])) {
                // console.log("  existe -- " + this.itensSelecionados[x].nome)
                if (this.data.itens[y]._id == this.itensSelecionados[x]._id) {
                  if (this.itensSelecionados[x].quantidadeSolicitada > 0) {
                    this.data.itens[y].quantidadeSolicitada = this.itensSelecionados[x].quantidadeSolicitada;
                  } else if (this.itensSelecionados[x].quantidadeSolicitada == 0) {
                    this.data.itens.splice(y, 1);
                  }
                }

              }
            }
          }
        }
      }
      this.dataService.addDocument(this.data);
      this.itensSelecionados = [];
      this.router.navigate(['/home']);
    }).catch((ex) => {
      console.error('Error fetching  editarItem', ex);
    });
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}
