import { Component,OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';

import { Ordem } from './ordem/ordem';
import { OrdensService } from './ordem/ordens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ordem  : Ordem;   

  constructor(private ordensService: OrdensService, 
              private router: Router ) { 
 
   }

  ngOnInit(){
      this.novaOrdem();

  }

   addData(event) {  
     event.preventDefault();
     this.ordensService.addItem(this.ordem); 
     this.novaOrdem();
     this.router.navigate(['/home']);
  }

  novaOrdem(){
    this.ordem = new Ordem();
  }

}


