import { Component,OnInit } from '@angular/core';

 
import { Ordem } from './ordem/ordem';
import { OrdensService } from './ordem/ordens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ordem  : any = {}; 


  constructor(private ordensService: OrdensService) { 
 
   }

  ngOnInit(){
  }

   addData(event) {  
     event.preventDefault();
     this.ordensService.addItem(this.ordem); 
  }

}


