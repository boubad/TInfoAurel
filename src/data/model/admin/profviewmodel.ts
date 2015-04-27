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
        let self = this;
        return super.post_change_item().then((r)=>{
            let id  = (self.current_item !== null) ? self.current_item.id : null;
            self.userInfo.enseignantid = id;
            return true;
            });
    }
}