//unite-model.js
//
import {DepSigleNameModel} from '../../data/model/admin/depsiglenamemodel';
import {Unite} from '../../data/domain/unite';
//
export class UniteModelClass extends DepSigleNameModel {
		constructor(){
			super(new Unite());
			this.base_title = 'Unités';
		}// constructor
	post_change_item(){
		let id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.uniteid = id;
		return true;
	}
	}// class UniteModelClass