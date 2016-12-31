import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators ,ReactiveFormsModule,FormGroup ,FormControl} from '@angular/forms';

import { Ordem } from './ordem/ordem';
import { OrdensService } from './ordem/ordens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ordem  : Ordem;  
  registerForm: FormGroup;
  constructor(private ordensService: OrdensService,private formBuilder: FormBuilder ) { 
 
   }

  ngOnInit(){
      this.novaOrdem();

  }

   addData(event) {  
     event.preventDefault();
     this.ordensService.addItem(this.ordem); 
     this.novaOrdem();
  }

  novaOrdem(){
    this.ordem = new Ordem();
  }

}


