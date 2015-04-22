//pouchdatabase.ts
//
/// <reference path='../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../infodata.d.ts' />
//
import {IBaseItem, IPerson, IItemGenerator, IDatabaseManager, IElementDesc} from '../../../infodata.d';
import {MyCrypto} from '../../domain/mycrypto';
import {Person} from '../../domain/person';
import {ElementDesc} from '../../domain/elementdesc';
import {ItemGenerator} from '../../domain/itemgenerator';
//
const DATABASE_NAME = 'geninfo';
//
declare var PouchDB: any;
//
export class PouchDatabase implements IDatabaseManager {
		private generator: IItemGenerator;
		private _db: PouchDB;
		public url: string;
		//
		constructor(name?: string) {
				this.generator = new ItemGenerator();
				this._db = null;
				this.url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
  }// constructor
		protected get db(): Promise<PouchDB> {
    let self = this;
    return new Promise((resolve, reject) => {
      if (self._db !== null) {
        resolve(self._db);
      } else {
        let xx = new PouchDB(self.url, (err, xdb) => {
          if ((err !== undefined) && (err !== null)) {
            reject(new Error(err.reason));
          } else {
            self._db = xdb;
            resolve(xdb);
          }
        });
      }
				});
  }// db
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
					 if ((pOld !== undefined) && (pOld !== null)) {
        if (pOld.type === undefined) {
          pOld.type = 'person';
        }
        if ((pOld.roles === undefined) || (pOld.roles === null)) {
          pOld.roles = ['super', 'admin'];
        } else if ((pOld.roles !== null) && (pOld.roles.length < 1)) {
          pOld.roles = ['super', 'admin'];
        }
					 }
					 return new Person(pOld);
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
  public get_items(item: IBaseItem, startKey?: any): Promise<IBaseItem[]> {
    let options: PouchGetOptions = { include_docs: true };
    if ((startKey !== undefined) && (startKey !== null)) {
      options.startkey = startKey;
    } else {
      options.startkey = item.start_key;
    }
    options.endkey = item.end_key;
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
  public find_elements(viewName: string, startKey?: any,
    skip?: number, limit?: number, bDesc?: boolean): Promise<IElementDesc[]> {
    let options: PouchQueryOptions = { include_docs: true };
    if ((startKey !== undefined) && (startKey !== null)) {
      options.startkey = startKey;
    }
    if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
      options.skip = skip;
    }
    if ((limit !== undefined) && (limit !== null) &&
      (limit > 0)) {
      options.limit = limit;
    }
    if ((bDesc !== undefined) && (bDesc !== null)) {
      options.descending = bDesc;
    }
    return this.db.then((xdb) => {
      return xdb.query(viewName, options).then((rr) => {
        let oRet = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }// find_elements
  public find_all_elements(item: IBaseItem, bDesc?: boolean): Promise<IElementDesc[]> {
    let viewName = item.index_name;
    let startKey = item.start_key;
    let endKey = item.end_key;
    let options: PouchQueryOptions = {
      startkey: item.start_key,
      endkey: item.end_key, include_docs: true
    };
    if ((bDesc !== undefined) && (bDesc !== null)) {
      options.descending = bDesc;
    }
    return this.db.then((xdb) => {
      return xdb.query(viewName, options).then((rr) => {
        let oRet = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }// find_all_elements
  public find_elements_array(item: IBaseItem, ids: string[]): Promise<IElementDesc[]> {
    let viewName = item.index_name;
    let options: PouchQueryOptions = { keys: ids, include_docs: true };
    return this.db.then((xdb) => {
      return xdb.query(viewName, options).then((rr) => {
        let oRet = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data) {
              if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }// find_elements_array
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
}// class PouchDatabase
