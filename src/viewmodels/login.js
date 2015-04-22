//login.js
//
import {BaseViewModel} from '../data/model/modelbase';
import {MaintainsDatabase} from '../data/services/pouchdb/maintainsdatabase';
//
export class LoginClass extends BaseViewModel {
		//
		constructor(){
			super();
			this.username = null;
			this.password = null;
			this.title = 'Connexion';
		}// constructor
		activate() {
			 return this.dataService.check_admin().then((x)=>{
			 	let db = new MaintainsDatabase();
			 	return db.check_schema();
			 });
			}// activate
		get canConnect() {
			return (this.username !== null) && (this.password !== null) &&
			(this.username.trim().length > 0) && (this.username.trim().length < 32) &&
			(this.password.trim().length > 0);
			}// canConnect
		get canNotConnect(){
			return (!this.canConnect);
		}	
		connect() {
			let suser = (this.username !== null) ? this.username.trim().toLowerCase() : null;
			let spass = this.password;
			let service = this.dataService;
			let self = this;
			let userinfo = this.userInfo;
			service.find_person_by_username(suser).then((pPers)=>{
				if (pPers === null){
					self.errorMessage = 'Utilisateur inconnu';
				} else {
					if (!pPers.check_password(spass)){
						self.errorMessage = 'Utilisateur inconnu';
						} else {
							userinfo.person = pPers;
							let id = pPers.id;
							let vid = pPers.avatarid;
							if (vid !== null){
								service.find_attachment(id,vid).then((data)=>{
									if (data !== null){
										 let xurl = window.URL.createObjectURL(data);
										 userinfo.photoUrl = xurl;
										 self.username = null;
										 self.password = null;
										}// data
									});
								}
						}
				}
				},(err)=>{
					self.set_error(err);
				});
		}// connect		
	}// class LoginClass