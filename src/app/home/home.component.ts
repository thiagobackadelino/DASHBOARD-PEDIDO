import { Component, OnInit ,Input} from '@angular/core';

import { Ordem } from '../ordem/ordem';
import { OrdensService } from '../ordem/ordens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  
  constructor(private ordensService: OrdensService) { 
   }

  ngOnInit() {  
  }

 
 
  

}
