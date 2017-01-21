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
  ordem: any = [];
  itensParaAdd: any = [];
  constructor(private itensService: ItensService, private dataService: DataServiceOrdem,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    //this.itensService.initCall();
  }

  ngAfterViewInit() {
  }

  montarPedido(event, item) {
    if (!this.existeDeterminadoItemNaLista(item)) {
      item.quantidadeSolicitada = event.novoValor;
      this.itensSelecionados.push(item);
    } else if (this.existeDeterminadoItemNaLista(item)) {
      for (var x in this.itensSelecionados) {
        if (this.itensSelecionados[x]._id === item._id) {
          this.itensSelecionados[x].quantidadeSolicitada = event.novoValor;
        }
      }
    }
    // console.table(this.itensSelecionados);
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

  existeDeterminadoItemNaListaData(item) {
    for (var x in this.ordem.itens) {
      if (this.ordem.itens[x]._id === item._id) {
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

  existeDeterminadoitensParaAdd(item) {
    for (var x in this.itensParaAdd) {
      if (this.itensParaAdd[x]._id === item._id) {
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
    // console.table(this.itensSelecionados);
    this.dataService.getDocumentById(id).then((data) => {
      // this.data = data[0];
      this.ordem = data[0];
      if (this.ordem.itens.length === 0) {
        //console.log("Comanda SEM itens , inserindo valores selecionados");
        this.ordem.itens = this.itensSelecionados;
        console.log(this.ordem.itens);
      } else {
        //  console.log("Comanda COM itens , inserir valores selecionados");
        if (this.ordem.itens.length < this.itensSelecionados.length) {
          //  console.log("Comanda COM menos itens que valores selecionados");
          for (var a in this.itensSelecionados) {
            for (var b in this.ordem.itens) {
              //console.log(this.existeDeterminadoItemNaListaData(this.itensSelecionados[a]));
              // console.log(this.itensSelecionados[a].nome + " -- " + this.ordem.itens[b].nome);
              if (this.itensSelecionados[a].quantidadeSolicitada != this.ordem.itens[b].quantidadeSolicitada
                && this.itensSelecionados[a]._id == this.ordem.itens[b]._id
                && this.itensSelecionados[a].quantidadeSolicitada > 0) {
                //  console.log(this.itensSelecionados[a].quantidadeSolicitada + " -- " + this.ordem.itens[b].quantidadeSolicitada);
                this.ordem.itens[b].quantidadeSolicitada = this.itensSelecionados[a].quantidadeSolicitada;
              }
              if (!this.existeDeterminadoItemNaListaData(this.itensSelecionados[a])
                && this.itensSelecionados[a].quantidadeSolicitada > 0) {
                //  console.log("inserindo " + this.itensSelecionados[a].nome);

                this.ordem.itens.push(this.itensSelecionados[a]);
              }

              if (this.itensSelecionados[a].quantidadeSolicitada != this.ordem.itens[b].quantidadeSolicitada
                && this.itensSelecionados[a]._id == this.ordem.itens[b]._id
                && this.itensSelecionados[a].quantidadeSolicitada == 0) {
                //console.log(this.itensSelecionados[a].quantidadeSolicitada + " -- " + this.ordem.itens[b].quantidadeSolicitada);
                //console.log("r");
                this.ordem.itens.splice(b, 1);
              }
            }
          }
        } else if (this.ordem.itens.length >= this.itensSelecionados.length) {
          // console.log("Comanda COM mais itens que valores selecionados");
          for (var c in this.ordem.itens) {
            for (var d in this.itensSelecionados) {
              //console.log(this.existeDeterminadoItemNaListaData(this.itensSelecionados[d]));
              //console.log(this.ordem.itens[c].nome + " -- " + this.itensSelecionados[d].nome);
              if (this.itensSelecionados[d].quantidadeSolicitada != this.ordem.itens[c].quantidadeSolicitada
                && this.itensSelecionados[d]._id == this.ordem.itens[c]._id
                && this.itensSelecionados[d].quantidadeSolicitada > 0) {
                // console.log(this.itensSelecionados[d].quantidadeSolicitada + " -- " + this.ordem.itens[c].quantidadeSolicitada);
                this.ordem.itens[c].quantidadeSolicitada = this.itensSelecionados[d].quantidadeSolicitada;
              }
              if (!this.existeDeterminadoItemNaListaData(this.itensSelecionados[d])
                && this.itensSelecionados[d].quantidadeSolicitada > 0) {
                // console.log("inserindo " + this.itensSelecionados[d].nome);
                this.ordem.itens.push(this.itensSelecionados[d]);
              }

              if (this.itensSelecionados[d].quantidadeSolicitada != this.ordem.itens[c].quantidadeSolicitada
                && this.itensSelecionados[d]._id == this.ordem.itens[c]._id
                && this.itensSelecionados[d].quantidadeSolicitada == 0) {
                // console.log(this.itensSelecionados[d].quantidadeSolicitada + " -- " + this.ordem.itens[c].quantidadeSolicitada);
                //  console.log("s");
                this.ordem.itens.splice(c, 1);
              }
            }
          }

        }
      }

      this.dataService.addDocument(this.ordem);
      this.itensParaAdd = [];
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
