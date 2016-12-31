import { Component, OnInit ,Input} from '@angular/core';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ordens: any = [];
  
  constructor(private ordensService: OrdensService) {
           OrdensService.emitirOrdemAlterada.subscribe(
      ordemAlterada => this.ordens = this.getOrdens()
    );
   }

  ngOnInit() {
    this.ordensService.initCall();

  }

    ngAfterViewInit() { 
      this. getOrdens();
  }

    getOrdens() {
    this.ordensService.getOrdens().then((data) => {
      this.ordens = data;   
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    });

  }

}
