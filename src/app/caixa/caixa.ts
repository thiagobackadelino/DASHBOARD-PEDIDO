    export class Caixa {

        public _id: string; 
        public aberto: boolean;
        public valorInicial: number;
        public observacao: string;
        public dataAbertura: Date; 
        public dataFechamento: Date; 
        public movimentacoes: any = []; 

      constructor() {  }


    }