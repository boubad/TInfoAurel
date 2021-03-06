//pouchdatabase.ts
//
/// <reference path='../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../infodata.d.ts' />
//
import {IBaseItem, IPerson, IItemGenerator, IDatabaseManager} from '../../../infodata.d';
import {MyCrypto} from '../../domain/mycrypto';
import {Person} from '../../domain/person';
import {EtudAffectation} from '../../domain/EtudAffectation';
import {EtudEvent} from '../../domain/etudevent';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudiantPerson} from '../../domain/etudperson';
import {ElementDesc} from '../../domain/elementdesc';
import {ItemGenerator} from '../../domain/itemgenerator';
//
export const DATABASE_NAME = 'geninfo';
//
declare var PouchDB: any;
//
export class PouchDatabase implements IDatabaseManager {
		private generator: IItemGenerator;
		private _db: PouchDB;
		public _url: string;
		//
		constructor(name?: string) {
				this.generator = new ItemGenerator();
				this._db = null;
				this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
  }// constructor
  public get url():string {
    return this._url;
  }
  public set url(name:string){
    this._db = null;
    this._url = ((name !== undefined) && (name !== null)) ? name : null;
  }
		protected get db(): Promise<PouchDB> {
    let self = this;
    return new Promise((resolve, reject) => {
      if (this.url === null){
        reject( new Error('Null database uri'));
      }
      else if (self._db !== null) {
        resolve(self._db);
      } else {
        let xx = new PouchDB(self.url, (err, xdb) => {
          if ((err !== undefined) && (err !== null)) {
            reject(new Error(err.reason));
          } else {
            if ((xdb !== undefined) && (xdb !== null)){
              self._db = xdb;
              resolve(xdb);  
            } else {
              reject(new Error("Undefined database handle."));
            }
          }
        });
      }
				});
  }// db
  public isOnline():Promise<boolean>{
    let self = this;
    return this.db.then((xdb)=>{
      return ((xdb !== undefined) && (xdb !== null));
      },(err)=>{
        return false;
      });
    }// isOnline
		protected maintains_doc(doc: any): Promise<PouchUpdateResponse> {
    let xdb: PouchDB = null;
    return this.db.then((dx) => {
      xdb = dx;
      return xdb.get(doc._id, { attachments: true });
				}).then((pOld) => {
      doc._rev = pOld._rev;
      if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
        doc._attachments = pOld._attachments;
      }
      return xdb.put(doc);
    }, (ex) => {
        if (ex.status == 404) {
          return xdb.put(doc);
        } else {
          throw new Error(ex.reason);
        }
      });
		}// maintains_doc
		public check_admin(): Promise<any> {
    let xdb: PouchDB = null;
    let username = 'admin';
    let id = 'PER-' + username;
    return this.db.then((dx) => {
      xdb = dx;
      return xdb.get(id);
				}).then((pOld) => {
						return { ok: true, id: pOld._id, rev: pOld._rev };
    }, (ex) => {
        if (ex.status != 404) {
          throw new Error(ex.reason);
        }
        var cc = new MyCrypto();
        return xdb.put({
          _id: id,
          username: username,
          password: cc.md5(username),
          firstname: 'Administrator',
          lastname: 'System',
          type: 'person',
          roles: ['super', 'admin']
        });
						});
  }// check_admin
  public find_item_by_id(id: string, bAttach?: boolean): Promise<IBaseItem> {
    let options: PouchGetOptions = {};
    if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
      options.attachments = true;
    }
    let gen = this.generator;
    return this.db.then((dx) => {
      return dx.get(id);
				}).then((pOld) => {
					 return gen.create_item(pOld);
    }, (err) => {
        if (err.status == 404) {
          return null;
        } else {
          throw new Error(err.reason);
        }
        let options: PouchGetOptions = {};
        if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
          options.attachments = true;
        }
        let gen = this.generator;
        return this.db.then((dx) => {
          return dx.get(id);
        }).then((pOld) => {
          return gen.create_item(pOld);
        }, (err) => {
            if (err.status == 404) {
              return null;
            } else {
              throw new Error(err.reason);
            }
          });
      });
		}//find_item_by_id
  public find_person_by_username(username: string, bAttach?: boolean): Promise<IPerson> {
    let options: PouchGetOptions = {};
    if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
      options.attachments = true;
    }
    let id = 'PER-' + username.toLowerCase();
    return this.db.then((dx) => {
      return dx.get(id);
				}).then((pOld) => {
      if (pOld.type == 'etudperson') {
        return new EtudiantPerson(pOld);
      } else {
        return new Person(pOld);
      }
    }, (err) => {
        if (err.status == 404) {
          return null;
        } else {
          throw new Error(err.reason);
        }
						});
		}//find_person_by_username
  public find_items_array(ids: string[], bAttachments?: boolean): Promise<IBaseItem[]> {
    let generator = this.generator;
    let options: PouchAllDocsOptions = { keys: ids, include_doc: true };
    if ((bAttachments !== undefined) && (bAttachments !== null) && (bAttachments == true)) {
      options.attachments = true;
    }
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
        let oRet: IBaseItem[] = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              let val = r.value;
              if ((val !== undefined) && (val !== null)) {
                if ((val.deleted === undefined) && ((val.error === undefined) || (val.error === null))) {
                  let x = generator.create_item(r.doc);
                  if (x !== null) {
                    oRet.push(x);
                  }
                }
              }// val
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }//get_items_array	
  public get_items(item: IBaseItem, startKey?: any, endKey?: any): Promise<IBaseItem[]> {
    let options: PouchGetOptions = { include_docs: true };
    if ((startKey !== undefined) && (startKey !== null)) {
      options.startkey = startKey;
    } else {
      options.startkey = item.start_key;
    }
    if ((endKey !== undefined) && (endKey !== null)) {
      options.endkey = endKey;
    } else {
      options.endkey = item.end_key;
    }
    let generator = this.generator;
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
        let oRet: IBaseItem[] = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              let val = r.value;
              if ((val !== undefined) && (val !== null)) {
                let x = generator.create_item(r.doc);
                if (x !== null) {
                  oRet.push(x);
                }
              }// val
            }// r
          }// data
        }// rr
        if (oRet.length > 1) {
          let x = oRet[0];
          let func = x.sort_func;
          oRet.sort(func);
        }
        return oRet;
      });
    });
  }// get_items
  public get_all_items(item: IBaseItem): Promise<IBaseItem[]> {
    let options: PouchGetOptions = {
      include_docs: true, startkey: item.start_key, endkey: item.end_key
    };
    let generator = this.generator;
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
        let oRet: IBaseItem[] = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              let val = r.value;
              if ((val !== undefined) && (val !== null)) {
                let x = generator.create_item(r.doc);
                if (x !== null) {
                  oRet.push(x);
                }
              }// val
            }// r
          }// data
        }// rr
        if (oRet.length > 1) {
          let x = oRet[0];
          let func = x.sort_func;
          oRet.sort(func);
        }
        return oRet;
      });
    });
  }// get_all_items
  public get_ids(startKey: string, endKey: any): Promise<string[]> {
    let options: PouchGetOptions = {
      startkey: startKey, endkey: endKey
    };
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
        let oRet: string[] = [];
        for (let r of rr.rows) {
          let id = r.id;
          oRet.push(id);
        }// r
        return oRet;
      });
    });
  }//get_ids
  public remove_all_items(startKey:string,endKey:string) : Promise<any> {
    let self = this;
    let docs:any[] = [];
    let options: PouchGetOptions = {
      startkey: startKey, endkey: endKey,include_docs:true
    };
    let rdb:PouchDB = null;
    return this.db.then((xdb)=>{
      rdb = xdb;
      return rdb.allDocs(options);
      }).then((dd)=>{
         for (let x of dd.rows){
           let d = x.doc;
           docs.push(d);
          }// x
          if (docs.length > 0){
            return rdb.bulkDocs(docs);
          } else {
            return [];
          }
        });
  }//remove_all_items
  protected internal_maintains_one_item(xdb: PouchDB, item: IBaseItem): Promise<IBaseItem> {
    let oMap = {};
    item.to_map(oMap);
    if ((item.id === undefined) || (item.id === null)) {
      oMap['_id'] = item.create_id();
    }
    let id = oMap['_id'];
    let generator = this.generator;
    return xdb.get(id, { attachments: true }).then((p) => {
      oMap['_rev'] = p._rev;
      if ((p['_attachments'] !== undefined) && (p['_attachments'] !== null)) {
        oMap['_attachments'] = p['_attachments'];
      }
      return xdb.put(oMap);
    }, (err) => {
        if (err.status != 404) {
          throw new Error(err.reason);
        }
        return xdb.put(oMap);
      }).then((z) => {
      return xdb.get(id, { attachments: true });
    }).then((pk) => {
      return generator.create_item(pk);
    });
  }// maintains_one_item
  public maintains_item(item: IBaseItem): Promise<IBaseItem> {
    let self = this;
    return this.db.then((xdb) => {
      return self.internal_maintains_one_item(xdb, item)
    });
  }// maintains_one_item
  public maintains_items(items: IBaseItem[]): Promise<IBaseItem[]> {
    let self = this;
    return this.db.then((xdb) => {
      let pp = [];
      for (let item of items) {
        var p = self.internal_maintains_one_item(xdb, item);
        pp.push(p);
      }// item
      return Promise.all(pp);
    });
  }// maintains_items
  public remove_item(item: IBaseItem): Promise<PouchUpdateResponse> {
    let xdb: PouchDB = null;
    let id = item.id;
    return this.db.then((d) => {
      xdb = d;
      return xdb.get(id);
    }).then((p) => {
      return xdb.remove(p);
    });
  }// remove_one_item
  public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
    return this.db.then((xdb) => {
      return xdb.getAttachment(docid, attachmentId);
    }).then((p) => {
      return p;
    }, (err) => {
        if (err.status == 404) {
          return null;
        } else {
          throw new Error(err.reason);
        }
      });
  }// find_attachment
  public maintains_attachment(docid: string, attachmentId: string,
    attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
    let xdb = null;
    return this.db.then((d) => {
      xdb = d;
      return xdb.get(docid);
    }).then((p) => {
      return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
    });
  }// maintains_attachment
  public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
    let xdb = null;
    return this.db.then((d) => {
      xdb = d;
      return xdb.get(docid);
    }).then((p) => {
      return xdb.removeAttachment(p._id, attachmentId, p._rev);
    });
  }// maintains_attachment
  public maintains_workitem(item:IBaseItem) : Promise<IBaseItem>{
    if ((item.personid === undefined) || (item.personid === null)){
      return this.maintains_item(item);
    } 
    let pid = item.personid;
    let self = this;
    return this.find_item_by_id(pid).then((pPers)=>{
      if (pPers === null){
        throw new Error('unknown person.');
      }
      if (item.id === null){
        item.id = item.create_id();
      }
      item.update_person(pPers);
      return self.maintains_item(pPers);
      }).then((x)=>{
         return self.maintains_item(item);
        });
    }// maintains_workitem
    public get_groupeevent_evts(grpeventid:string,bNote?:boolean): Promise<IBaseItem[]>{
       let model = new EtudEvent({groupeeventid:grpeventid});
       let m = ((bNote !== undefined) && (bNote !== null)) ? bNote : false;
       return this.get_all_items(model).then((aa)=>{
        let pp:IBaseItem[] = ((aa !== undefined) && (aa !== null)) ? aa : [];
        let oRet:IBaseItem[] = [];
        for (let x of pp){
           if (m){
             if (x.genre == 'note'){
               oRet.push(x);
             }
            } else if (x.genre != 'note'){
              oRet.push(x);
            }
          }// x
        return oRet;
        });
      }//get_groupeevent_evts
    public check_groupeevent_notes(grpeventid:string): Promise<IBaseItem[]> {
      let self = this;
      let depid:string = null;
      let anneeid:string = null;
      let uniteid:string = null;
      let semestreid:string = null;
      let groupeid:string = null;
      let eventDate:Date  = null;
      let allevts:IBaseItem[] = [];
      let xgenre:string = 'note';
      return this.find_item_by_id(grpeventid).then((gvt)=>{
        if ((gvt === undefined) || (gvt === null)){
           throw  new Error('Unknown groupeevent.');
          }
          eventDate = gvt.eventDate;
          return self.find_item_by_id(gvt.profaffectationid);
        }).then((praff)=>{
          if ((praff === undefined)|| (praff === null)){
            throw  new Error('Unkown profaffectation');
            }
            groupeid = praff.groupeid;
            semestreid = praff.semestreid;
            anneeid = praff.anneeid;
            depid = praff.departementid;
            let model = new EtudAffectation({semestreid:semestreid,
              groupeid:groupeid,anneeid:anneeid,
              departementid:depid});
            return self.get_all_items(model);
          }).then((affs)=>{
              let cont = ((affs !== undefined) && (affs !== null)) ?
              affs  : [] ;
              for (let xaf of affs){
                  let x = new EtudEvent({
                    departementid:depid,
                    anneeid: anneeid,
                    semestreid:semestreid,
                    groupeid:groupeid,
                    personid: xaf.personid,
                    etudiantid: xaf.etudiantid,
                    etudaffectationid: xaf.id,
                    firstname: xaf.firstname,
                    lastname: xaf.lastname,
                    groupeeventid:grpeventid,
                    eventDate: eventDate,
                    genre: xgenre
                    });
                allevts.push(x);
                }// xaff
                return self.get_groupeevent_evts(grpeventid,true);
          }).then((pp)=>{
            for (let y of allevts){
                let xid = y.etudaffectationid;
                for (let z of pp){
                    if ((z.genre == xgenre) && (z.etudaffectationid == xid)){
                      y.id = z.id;
                      y.rev = z.rev;
                      y.status = z.status;
                      y.note = z.note;
                      y.attachments = z.attachments;
                      break;
                    }
                  }// z
              }// y
            return allevts;
          });
      }//check_groupeevent_events
}// class PouchDatabase
