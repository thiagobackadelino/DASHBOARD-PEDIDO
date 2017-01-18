
  
    export class Ordem {

        public _id: string;
        public nome: string;
        public status: string;
        public observacao: string;
        public data: string;
        public hora: number;
        public delivery: boolean;
        public prioridade: boolean;
        public itens: any = [];
        public excluida: boolean;
        public quantidadePessoas: number;

      constructor() {  }


    }