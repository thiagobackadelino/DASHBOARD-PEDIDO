import { DataServiceOrdem } from './services/data.service.ordem';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ordem } from './ordem/ordem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ordem: Ordem;



  constructor(private dataService: DataServiceOrdem,
    private router: Router) {
    var events = require('events');
    events.defaultMaxListeners = 0;

  }

  ngOnInit() {
    this.novaOrdem();

  }

  addOrdem(event) {
    event.preventDefault();
    this.ordem._id = "" + this.getDiaAtual() + this.getHoraAtual() + (Math.random() * 10);
    this.ordem.data = this.getDiaAtual();
    this.ordem.hora = this.getHoraAtual();
    this.ordem.status = "ABERTA";
    this.dataService.addDocument(this.ordem);
    this.novaOrdem();
    this.router.navigate(['/home']);
  }

  novaOrdem() {
    this.ordem = new Ordem();
  }

      getDiaAtual() {
        let date = new Date();
        return date.toISOString().substring(0, 10);
    }

    getHoraAtual() {
        return Date.now();
}

}


