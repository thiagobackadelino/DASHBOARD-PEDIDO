import { Item } from './../itens/item'; 
  
    export class Ordem {

        public _id: string;
        public nome: string;
        public status: string;
        public data: Date;
        public delivery: boolean;
        public itens: any = [];

      constructor() {  }


    }