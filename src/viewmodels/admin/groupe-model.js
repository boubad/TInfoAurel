//groupe-model.js
//
import {DepSigleNameModel} from '../../data/model/admin/depsiglenamemodel';
import {Groupe} from '../../data/domain/groupe';
//
export class GroupeModelClass extends DepSigleNameModel {
		constructor(){
			super(new Groupe());
			this.base_title = 'Groupes';
		}// constructor
	post_change_item(){
		let id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.groupeid = id;
		return true;
	}
	}// class GroupeModelClass