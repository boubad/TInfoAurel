//avatar-model.js
//
//
//import {inject} from 'aurelia-framework';
//import {Validation} from 'aurelia-validation';
import {BaseViewModel} from '../data/model/modelbase';
//
//
export class AvatarModel extends BaseViewModel {
	constructor(){
		super();
		this.title='Avatar';
		this.personid = null;
		this._url = null;
		this.imageData = null;
		this.hasUrl = false;
		this.filename = null;
		this.filetype = null;
		//
		this.avatarid = null;
		this.oldUrl = null;
		this.hasOldUrl = false;
	}
	reset_data(){
		this._url = null;
		this.imageData = null;
		this.hasUrl = false;
		this.filename = null;
		this.filetype = null;
	}
	activate(){
		this.reset_data();
		let userinfo = this.userInfo;
		this.avatarid = userinfo.avatarid;
		this.personid = userinfo.personid;
		this.oldUrl = userinfo.photoUrl;
		this.hasOldUrl = (this.oldUrl !== null);
		return true;
	}
	get url(){
		return this._url;
	}
	set url(s){
		if (this._url !== null){
			window.URL.revokeObjectURL(this._url);
		}
		this._url = s;
	}
	get canRemove(){
		return (this.personid !== null) && (this.avatarid !== null);
	}
	get canSave() {
		return (this.url !== null) && (this.personid !== null) &&
		 (this.imageData !== null) && (this.filename !== null) && (this.filetype !== null);
	}
	fileChanged(event){
		let self = this;
		let files = event.target.files;
		if ((files !== undefined) && (files !== null) && (files.length > 0)){
			let file = files[0];
			let fr = new FileReader();
			fr.onloadend = (e) =>{
				let data = e.target.result;
    			let dd = new Uint8Array(data);
    			let blob = new Blob([dd]);
    			self.imageData = blob;
    			self.url = window.URL.createObjectURL(blob);
    			self.hasUrl = true;
    			self.filename = file.name;
    			self.filetype = file.type;
			};
			fr.readAsArrayBuffer(file);
		}// files
	}// fileChanged
	remove(){
		if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')){
			let self = this;
			let userinfo = this.userInfo;
			let pPers = userinfo.person;
			this.dataService.remove_attachment(this.personid,this.avatarid).then((r)=>{
				pPers.avatarid = null;
				userinfo.person = pPers;
				userinfo.photoUrl = null;
				userinfo.avatarid = null;
				self.oldUrl = null;
				self.hasOldUrl = false;
			},(err)=>{
				self.set_error(err);
			});
		}
	}
	save(){
		let self = this;
		let userinfo = this.userInfo;
		let id = this.personid;
		if (id === null){
			return;
		}
		let pPers = userinfo.person;
		let service = this.dataService;
		this.clear_error();
		//

		return service.maintains_attachment(id,this.filename,this.imageData,this.filetype).then((r)=>{
			pPers.avatarid = self.filename;
			pPers.avatardocid = id;
			userinfo.person = pPers;
			userinfo.photoUrl = self.url;
			userinfo.avatarid = self.filename;
			self.oldUrl = self.url;
			self.hasOldUrl = true;
			self.reset_data();
			return service.maintains_item(pPers);
		},(err)=>{
			self.set_error(err);
		});
	}// save
}// class AvatarModelClass