//dep-model.js
//
import {inject} from 'aurelia-framework';
//
import {SigleNameModel} from '../../data/model/admin/siglenamemodel';
import {Departement} from '../../data/domain/departement';
//
export class DepModelClass extends SigleNameModel {
		constructor(){
			super(new Departement());
			this.title = 'Départements';
		}// constructor
	post_change_item(){
		let id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.departementid = id;
		return true;
	}
	}// class DepModelClass