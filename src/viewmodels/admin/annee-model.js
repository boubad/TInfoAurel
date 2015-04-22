//annee-model.js
//
import {IntervalViewModel} from '../../data/model/admin/intervalviewmodel';
import {Annee} from '../../data/domain/annee';
//
export class AnneeModelClass extends IntervalViewModel {
		constructor(){
			super(new Annee());
			this.base_title = 'Années';
		}// constructor
	post_change_item(){
		let id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.anneeid = id;
		return true;
	}
	}// class AnneMeodelClass