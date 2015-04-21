//pouchdatabase.ts
//
/// <reference path='../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../infodata.d.ts' />
//
import {IBaseItem,IPerson,IItemGenerator,IDatabaseManager} from '../../../infodata.d';
import {PouchDB} from 'pouchdb';
import {MyCrypto} from '../../domain/mycrypto';
import {Person} from '../../domain/person';
import {ItemGenerator} from '../../domain/itemgenerator';
//
const DATABASE_NAME = 'geninfo';
//

//
export class PouchDatabase implements IDatabaseManager {
		private generator:IItemGenerator;
		private _db:PouchDB;
		public  url:string;
		//
		constructor(name?:string){
				this.generator = new ItemGenerator();
				this._db = null;
				this.url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
			}// constructor
		protected get db(): Promise<PouchDB> {
			let self = this;
			return new Promise((resolve,reject)=>{
				if (self._db !== null){
					resolve(self._db);
				} else {
					let xx = new PouchDB(self.url,(err,xdb)=>{
						if ((err !== undefined) && (self !== null)){
							reject(new Error(err.reason));
						} else {
							self._db = xdb;
							resolve(xdb);
						}
						});
				}
				});
			}// db		
		protected maintains_doc(doc:any) : Promise<PouchUpdateResponse> {
			let xdb:PouchDB = null;
			return this.db.then((dx)=>{
				xdb = dx;
				return xdb.get(doc._id,{attachments:true});
				}).then((pOld)=>{
					doc._rev = pOld._rev;
					if ((pOld._attachments !== undefined) && (pOld._attachments !== null)){
						doc._attachments = pOld._attachments;
					}
					return xdb.put(doc);
					},(ex)=>{
					  if (ex.status == 404){
					  	return xdb.put(doc);
					  }	 else {
					  	throw new Error(ex.reason);
					  }
					});
		}// maintains_doc	
		public check_admin(): Promise<any> {
			let xdb:PouchDB = null;
			let username = 'admin';
			let id = 'PER-' + username;
			return this.db.then((dx)=>{
				xdb = dx;
				return xdb.get(id);
				}).then((pOld)=>{
						return {ok:true,id:pOld._id,rev:pOld._rev};
					},(ex)=>{
						if (ex.status != 404){
							throw new Error(ex.reason);
						}
						var cc = new MyCrypto();
						return xdb.put({
							_id: id,
							username: username,
							password: cc.md5(username),
							firstname: 'Administrator',
							lastname: 'System',
							type:'person',
							roles:['super','admin']});
						});
			}// check_admin	
	public find_item_by_id(id:string,bAttach?:boolean) : Promise<IBaseItem>{
			let options:PouchGetOptions = {};
			if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)){
				options.attachments = true;
			}
			let gen = this.generator;
			return this.db.then((dx)=>{
				return dx.get(id);
				}).then((pOld)=>{
					 return gen.create_item(pOld);
					},(err)=>{
						if (err.status == 404){
							return null;
						} else {
							throw new Error(err.reason);
						}
						let options:PouchGetOptions = {};
			if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)){
				options.attachments = true;
			}
			let gen = this.generator;
			return this.db.then((dx)=>{
				return dx.get(id);
				}).then((pOld)=>{
					 return gen.create_item(pOld);
					},(err)=>{
						if (err.status == 404){
							return null;
						} else {
							throw new Error(err.reason);
						}
						});});
		}//find_item_by_id
	public find_person_by_username(username:string,bAttach?:boolean) : Promise<IPerson> {
		let options:PouchGetOptions = {};
			if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)){
				options.attachments = true;
			}
			let id = 'PER-' + username.toLowerCase();
			return this.db.then((dx)=>{
				return dx.get(id);
				}).then((pOld)=>{
					 if ((pOld !== undefined) && (pOld !== null)){
					 	if (pOld.type === undefined){
					 		pOld.type = 'person';
					 	}
					 	if ((pOld.roles === undefined) || (pOld.roles === null)){
					 		pOld.roles = ['super','admin'];
					 	} else if ((pOld.roles !== null) && (pOld.roles.length < 1)){
					 		pOld.roles = ['super','admin'];
					 	}
					 }
					 return new Person(pOld);
					},(err)=>{
						if (err.status == 404){
							return null;
						} else {
							throw new Error(err.reason);
						}
						});
		}//find_person_by_username
	}// class PouchDatabase
