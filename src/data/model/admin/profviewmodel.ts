//profviewmodel.ts
import {IBaseItem} from '../../../infodata.d';
import {PersonViewModel} from './personviewmodel';
import {Person} from '../../domain/person';
import {Enseignant} from '../../domain/enseignant';
//
//
export class EnseignantViewModel extends PersonViewModel{
    constructor(){
        super(new Enseignant(), new Person());
    }
     protected create_item(): IBaseItem {
        let p = super.create_item();
        this._currentPerson.roles = ['prof'];
        return p;
    }// create_item
    protected post_change_item() : any{
        super.post_change_item();
        let id  = (this.current_item !== null) ? this.current_item.id : null;
        this.userInfo.uniteid = id;
        return true;
    }
}