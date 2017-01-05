import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ItensService } from '../itens/itens.service';
import { OrdensService } from './../ordem/ordens.service';
import { Ordem } from '../ordem/ordem';

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

  constructor(private itensService: ItensService, private ordensService: OrdensService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.itensService.initCall();
  }

  ngAfterViewInit() {
  }

  montarPedido(event, item) {
    if (this.itensSelecionados.length == 0) {
      item.quantidade = event.novoValor;
      this.itensSelecionados.push(item);
    } else {
      item.quantidade = event.novoValor;
      if (!this.existeDeterminadoItemNaLista(item)) {
        if (item.quantidade == 0) {
        } else if (item.quantidade > 0) {
          this.itensSelecionados.push(item);
        }
      } else if (this.existeDeterminadoItemNaLista(item)) {
        console.log("this.existeDeterminadoItemNaLista(item)");
        if (item.quantidade == 0) {
          console.log("item.quantidade == 0");
          //this.removeItemZeradoDaLista(item) 
          //this.itensSelecionados.push(item);
        }
      }
      console.table(this.itensSelecionados);
    }
  }

  existeDeterminadoItemNaLista(item) {
    for (var x in this.itensSelecionados) {
      if (this.itensSelecionados[x]._id == item._id) {
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
      console.log(this.itensSelecionados[x]._id + "-------" + item._id);
      if (this.itensSelecionados[x]._id == item._id) {
        this.itensSelecionados.splice(x, 1);
      }
    }
  }

  editarItem(id, itensSelecionados) {
    //console.table(itensSelecionados); 
    this.ordensService.editarItem(id, itensSelecionados);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}
