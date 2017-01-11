import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  @Input('x')  classe: string ;

  constructor() { }

  ngOnInit() {
  }

}
