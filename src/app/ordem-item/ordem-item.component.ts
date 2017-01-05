import { Component, OnInit, Input } from '@angular/core';
import { Ordem } from '../ordem/ordem';

@Component({
  selector: 'app-ordem-item',
  templateUrl: './ordem-item.component.html',
  styleUrls: ['./ordem-item.component.css']
})
export class OrdemItemComponent implements OnInit {
  @Input('n') item: any[];
  constructor() { }

  ngOnInit() {
  }

}
