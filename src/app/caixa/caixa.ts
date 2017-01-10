    export class Caixa {

        public _id: string;  
        public valorInicial: number;
        public observacao: string;
        public dataAbertura: Date; 
        public dataFechamento: Date; 
        public movimentacoes: any = []; 

      constructor() {  }


    }