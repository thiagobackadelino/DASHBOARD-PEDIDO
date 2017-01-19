import { Item } from './../itens/item';
import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

var PouchDB = require('pouchdb');

@Injectable()
export class DataServiceCaixa {

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

    var PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-upsert'));

    this.db = new PouchDB('dashboard-pedido-caixa');


    // cloudant login details
    this.username = 'sonic';
    this.password = 'sonic';

    // cloudant, couchdb, couchbase remote url
    // eg - https://<your_host>.cloudant.com/todohttp://sonic:sonic@127.0.0.1:5984/
    this.remote = 'http://sonic:sonic@192.168.0.100:5984/dashboard-pedido-caixa';

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
    this.db.setMaxListeners(0);
  }

  initCall() {
    // make sure UI is initialised
    // correctly after sync.
    this.zone.run(() => { });
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
        limit: 30,
        descending: false
      }).then((result) => {
        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });

        // this.data.reverse(); 

        this.db.changes({
          live: true, since: 'now', include_docs:
          true
        }).once('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  existeCaixaDiaAtual(id) {
    return new Promise(resolve => {
      this.db.query(function (doc, emit) {
        emit(doc._id);
      }, { key: id, include_docs: true }).then((result) => {
        //console.log(result.rows.length);
        if (result.rows.length == 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  getCaixaDiaAtual(id) {
    return new Promise(resolve => {
      this.db.query(function (doc, emit) {
        emit(doc._id);
      }, { key: id, include_docs: true }).then((result) => {

        let docs = result.rows.map((row) => {
          resolve(row.doc);
        });

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

}

