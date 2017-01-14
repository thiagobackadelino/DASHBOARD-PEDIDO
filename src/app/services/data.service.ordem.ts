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
    this.remote = 'http://sonic:sonic@192.168.0.103:5984/dashboard-pedido-ordem';

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

   this.db.changes({live: true, since: 'now'})
  .on('change', (change) => {
    this.zone.run(() => {
       this.reactToChanges(change);
    });
});
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
 
        /*this.db.changes({
          live: true, since: 'now', include_docs:
            true
        }).once('change', (change) => {
          this.handleChange(change);
        });*/

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  getDocumentById(id) {
    return new Promise(resolve => {
      this.db.get(id).then((result) => {
        this.data = []; 
        //console.log(result);
        this.data.push(result); 

        resolve(this.data);

        /*this.db.changes({
          live: true, since: 'now', include_docs:
            true
        }).once('change', (change) => {
          this.handleChange(change);
        });*/

      }).catch((error) => {

        console.log(error);

      });

    });

  }

    alterarPrioridade(result) { 
      //console.log(result);
          this.db.upsert(result._id, function (doc) {
            
          }).then(function (changes) {
            // success, res is {rev: '1-xxx', updated: true}
           // console.log("sucesso"); 
          }).catch(function (err) {
            // error
            console.log("erro alterarPrioridade");
          });
  }


  reactToChanges(change) { 
    if (change.deleted) {
      // change.id holds the deleted id
      this.onDeleted(change.id);
    } else { // updated/inserted
      // change.doc holds the new doc
      this.onUpdatedOrInserted(change.doc);
    }
    //renderDocsSomehow(); 
  }


 binarySearch(arr, docId) {
  var low = 0, high = arr.length, mid;
  while (low < high) {
    mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
    arr[mid]._id < docId ? low = mid + 1 : high = mid
  }
  return low;
}

onDeleted(id) {
  var index = this.binarySearch(this.data, id);
  var doc = this.data[index];
  if (doc && doc._id === id) {
    this.data.splice(index, 1);
  }
}

onUpdatedOrInserted(newDoc) {
  var index = this.binarySearch(this.data, newDoc._id);
  var doc = this.data[index];
  if (doc && doc._id === newDoc._id) { // update
    this.data[index] = newDoc;
  } else { // insert
    this.data.splice(index, 0, newDoc);
  }
}


handleChange(change){ 
    this.zone.run(() => {
      if(change.updated){
        this.data.push(change.doc);
      }
 
      let changedDoc = null;
      let changedIndex = null;
 
      this.data.forEach((doc, index) => {
 
        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }
 
      });
 
      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      } 
      else {
 
        //A document was updated
        if(changedDoc){
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

