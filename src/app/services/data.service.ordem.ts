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


    // cloudant login details
    this.username = 'sonic';
    this.password = 'sonic';

    // cloudant, couchdb, couchbase remote url
    // eg - https://<your_host>.cloudant.com/todohttp://sonic:sonic@127.0.0.1:5984/
    this.remote = 'http://sonic:sonic@192.168.0.101:5984/dashboard-pedido-ordem';

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

    this.db.changes({ live: true, since: 'now', include_docs: true })
      .on('change', (change) => {
        this.zone.run(() => {
          this.handleChange(change);
        });
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

          this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
            this.handleChange(change);
          });

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

  alterarPrioridade(result) {
    //console.log(result);
    this.db.upsert(result._id, function (doc) {

      return result;
    }).then(function (changes) {
      // success, res is {rev: '1-xxx', updated: true}
      // console.log("sucesso"); 
    }).catch(function (err) {
      // error
      console.log("erro alterarPrioridade");
    });
  }

  handleChange(change) {

    this.zone.run(() => {
      if (change.updated) {
        this.data.push(change.doc);
      }

      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {

        if (doc._id === change.id) {
          changedDoc = doc;
          changedIndex = index;
        }

      });

      //A document was deleted
      if (change.deleted) {
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

    });

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
  getOrdensPorStatusPQ() {
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
      }).catch(function (err) {
        // some error (maybe a 409, because it already exists?)
      });

      this.db.query('my_index/by_name', {
        limit: 1 //  0  return any results
        , include_docs: true
      }).then(function (res) {
        // index was built!
        console.log(res);
      }).catch(function (err) {
        // some error
      });
    });
  }
  //Temporary queries
  getOrdensDoDiaAtualPQ() {
    var date = this.getDiaAtual(); 
     return new Promise(resolve => {
      this.db.query(function (doc, emit) { 
        if(doc.data == date)
        emit(doc.data);
      },
        { include_docs: true}).then((result) => {
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

  getDocumentByIdTQ(id){ 
     return new Promise(resolve => {
      this.db.query(function (doc, emit) {
         
          emit(doc._id); 
        
      },
        { include_docs: true, key:id}).then((result) => {
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

    getDiaAtual() {
        let date = new Date();
        return date.toISOString().substring(0,10);
    }

}

