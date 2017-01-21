import { document } from './../com/utils/facade/browser';
import { Item } from './../itens/item';
import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

var PouchDB = require('pouchdb');

@Injectable()
export class DataServiceOrdem {

  db: any;
  username: any;
  password: any;
  remote: any;
  data: any = [];
  url: any;
  results: any;
  api: any;

  constructor(private _http: Http, private zone: NgZone) {

    // database name

    PouchDB.plugin(require('pouchdb-upsert'));

    this.db = new PouchDB('dashboard-pedido-ordem');
    //console.log(this.db.adapter);

    // cloudant login details
    this.username = 'sonic';
    this.password = 'sonic';

    // cloudant, couchdb, couchbase remote url
    // eg - https://<your_host>.cloudant.com/todohttp://sonic:sonic@127.0.0.1:5984/
    this.remote = 'http://sonic:sonic@127.0.0.1:5984/dashboard-pedido-ordem';

    // cloudant, couchdb, couchbase remote url
    // applicable when username/password set. 
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };

    this.db.sync(this.remote, options);

    this.db.changes({ live: true, since: 'now', include_docs: true, continuous: true })
      .on('change', (change) => {
        this.handleChange(change);
      });
  }

  initCall() {
    // make sure UI is initialised
    // correctly after sync.
    console.log("this.zone.run(() => { });");
    this.zone.run(() => { });
  }

  // NOTE: Another way to retrieve data via a REST call
  getUrl() {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    this.api = this.remote + '/_all_docs?include_docs=true';

    return new Promise(resolve => {
      this._http.get(this.api, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          this.results = data;

          this.data = [];

          let docs = this.results.rows.map((row) => {
            this.data.push(row.doc);
          });

          resolve(this.data);


        });
    });

  }

  addDocument(doc) {
    this.db.put(doc);
  }

  deleteDocument(id) {
    this.db.remove(id);
  }

  getOrdens() {
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true,
        descending: false
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });
      }).catch((error) => {
        console.log(error);
      });


    });
  }

  getDocumentById(id) {
    return new Promise(resolve => {
      this.db.get(id).then((result) => {
        this.data = [];
        this.data.push(result);
        resolve(this.data);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  handleChange(change) {
    //console.log(change);
    let changedDoc = null;
    let changedIndex = null;

    /*this.data.forEach((doc, index) => {
      console.log("oiasó");
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });*/

    for (var x in this.data) {
      if (this.data[x]._id === change.id) {
        changedDoc = this.data[x];
        changedIndex = x;
      }
    }


    //A document was deleted
    if (change.deleted) {
      console.log("deleted");
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }
    //console.table(this.data);
  }


  //Temporary queries
  getOrdensPorStatusTQ(status) {
    return new Promise(resolve => {
      this.db.query(function (doc, emit) {
        emit(doc.status);
      },
        { include_docs: true, key: status }).then(function (result) {
          console.log(result);
        }).catch(function (err) {
          console.log("nao achou");
        });
    });
  }

  //Persistent queries
  getOrdensDoDiaAtualPQ() {
    return new Promise(resolve => {
      var emit = "function (doc) { emit(doc.name); }" // <------ OK 
      var ddoc = {
        _id: '_design/dia_atual',
        views: {
          by_name: {
            map: emit //function (doc) { emit(doc.name); }   <-----  X
          }
        }
      };
      // save it
      this.db.put(ddoc).then(function () {
        // success!
        //console.log(ddoc);
      }).catch(function (err) {
        // console.log(err);
        // some error (maybe a 409, because it already exists?)
      });

      this.db.query('dia_atual/by_name', {
        include_docs: true
      }).then((result) => {
        // index was built! 
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        //console.table(this.data);
        //console.log(result);

      }).catch(function (err) {
        console.log(err);
        // some error
      });
    });
  }
  //Temporary queries
  getOrdensDoDiaAtualTQ() {
    var date = this.getDiaAtual();
    return new Promise(resolve => {
      this.db.query(function (doc, emit) {
        if (doc.data == date)
          emit(doc.data);
      },
        { include_docs: true }).then((result) => {
          this.data = [];
          let docs = result.rows.map((row) => {
            this.data.push(row.doc);
            resolve(this.data);
          });
        }).catch(function (err) {
          console.log("nao achou");
        });
    });
  }

  getDocumentByIdTQ(id) {
    return new Promise(resolve => {
      this.db.query(function (doc, emit) {

        emit(doc._id);

      },
        { include_docs: true, key: id }).then((result) => {
          this.data = [];
          let docs = result.rows.map((row) => {
            this.data.push(row.doc);
            resolve(this.data);
          });
        }).catch(function (err) {
          console.log("getDocumentByIdTQ");
        });
    });
  }


  alterarDeliveryIdTQ(id) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          if (row.doc.delivery == true) {
            row.doc.delivery = false;
          } else {
            row.doc.delivery = true;
          }
          this.addDocument(row.doc);

        });
      }).catch(function (err) {
        console.log("alterarDeliveryIdTQ" + err);
      });
  }

  alterarPrioridadeIdTQ(id) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          if (row.doc.prioridade == true) {
            row.doc.prioridade = false;
          } else {
            row.doc.prioridade = true;
          }
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("alterarPrioridadeIdTQ" + err);
      });
  }

  alterarStatusIdTQ(id, status) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          row.doc.status = status;
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("alterarStatusIdTQ" + err);
      });
  }

  alterarObservacaoIdTQ(id, obs) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          row.doc.observacao = obs;
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("alterarObservacaoIdTQ" + err);
      });
  }

  excluirOrdemTQ(id) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          if (row.doc.excluida == true) {
            row.doc.excluida = false;
          } else {
            row.doc.excluida = true;
          }
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("excluirTQ" + err);
      });
  }

  incluirQuantidadeDePessoasTQ(valor, id) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: id, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          row.doc.quantidadePessoas = valor;
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("incluirQuantidadeDePessoasTQ" + err);
      });
  }

  alterarStatusDoItemTQ(iordemid, itemid) {
    this.db.query(function (doc, emit) {
      emit(doc._id);
    },
      { include_docs: true, key: iordemid, limit: 1 }).then((result) => {
        let docs = result.rows.map((row) => {
          for (var x in row.doc.itens) {
            if (row.doc.itens[x]._id == itemid) {
              if (row.doc.itens[x].quantidadeFeita < row.doc.itens[x].quantidadeSolicitada) {
                row.doc.itens[x].quantidadeFeita += 1;
              } else if (!row.doc.itens[x].quantidadeFeita) {
                row.doc.itens[x].quantidadeFeita = 1;
              }
            }
          }
          this.addDocument(row.doc);
        });
      }).catch(function (err) {
        console.log("alterarStatusDoItemTQ" + err);
      });
  }

  getDiaAtual() {
    let date = new Date();
    return date.toISOString().substring(0, 10);
  }

  clearData() {
    this.data = [];
  }



}

