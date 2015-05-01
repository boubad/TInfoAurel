//localstore.ts
//
import {IObjectStore} from '../../infodata.d';
//
import {PouchDatabase} from '../services/pouchdb/pouchdatabase';
//
const DEFAULT_LOCAL_DATABASE = 'geninfo';
const DEFAULT_FIRST_REMOTE_DATABASE = 
     'http://boubadiarra.hd.free.fr:5489/geninfo';
const DEFAULT_SECOND_REMOTE_DATABASE = 'http://localhost:5489/geninfo';     
//
export class LocalObjectStore implements IObjectStore {
  //
  private _localbase:string;
  private _remotebase:string;
  //
  constructor() {
    this._localbase = null;
    this._remotebase = null;
  }// constructor
  public remoteBaseUrl():Promise<string>{
    let self = this;
    let s2:string = null;
    if (this._remotebase !== null){
      return Promise.resolve(this._remotebase);
    } 
    let s1 = this.get_value('remoteBase');
    if (s1 === null){
        s1 = DEFAULT_FIRST_REMOTE_DATABASE;
      }
    let p1 = new PouchDatabase(s1);
    return p1.isOnline().then((b1:boolean)=>{
      if (b1){
        self.store_value('remoteBase',s1);
        self._remotebase = s1;
        return s1;
      } else {
          if (s1 != DEFAULT_FIRST_REMOTE_DATABASE){
            s2 = DEFAULT_FIRST_REMOTE_DATABASE;
          } else if (s1 != DEFAULT_SECOND_REMOTE_DATABASE){
            s2 = DEFAULT_SECOND_REMOTE_DATABASE;
          }
          let pp2 = new PouchDatabase(s2);
          return pp2.isOnline().then((b2:boolean)=>{
            if (b2){
              self.store_value('remoteBase',s2);
              self._remotebase = s2;
              return s2;
            } else {
              throw new Error('Cannot get remote database');
            }
            });
        }// not s1
    });
    }// get removeBase
  public changeRemoteBase(s:string) : void {
    if ((s !== undefined) && (s !== null)){
      this._remotebase = null;
      this.store_value('remoteBase',s);
    }
  } // set remoteBase 
  public get localBase():Promise<string> {
    let self = this;
    if (this._localbase !== null){
      return Promise.resolve(this._localbase);
    } else {
      let s = this.get_value('localBase');
      if (s === null){
        s = DEFAULT_LOCAL_DATABASE;
      }
      let p = new PouchDatabase(s);
      return p.isOnline().then((b)=>{
         if (b){
          self.store_value('localBase',s);
          self._localbase = s;
          return s;
         } else {
          throw new Error("Local database not online.");
         }
        });
    }
  }
  public get_value(key:string) : string {
    let vRet = null;
    if ((key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
         vRet = window.localStorage.getItem(skey);
         if ((vRet !== null) && (vRet == "null")){
            vRet = null;
         }
      }// skey
    }// exists
    return vRet;
  }// get_value
  public store_value(key:string, value:string) : any {
    if ((key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
          try {
            if ((value !== undefined) && (value !== null)){
              window.localStorage.setItem(skey,value);
            } else if (window.localStorage.getItem(skey) !== null){
              window.localStorage.removeItem(skey);
            }
            
          } catch (e) {
            console.log('LocalObjectStore error: ' + e.toString());
          }
      }// skey
    }// exists
  }// store_value
  public remove_value(key:string) : any {
    return this.store_value(key, null);
  }// remove_value
}// class LocalObjectStore