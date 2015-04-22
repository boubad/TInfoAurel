import { SigleNameModel } from './siglenamemodel';
import { Departement } from '../../domain/departement';
//
export class DepSigleNameModel extends SigleNameModel {
    //
    constructor(model) {
        super(model);
        this._depelem = null;
        this.departements = [];
        this.base_title = null;
    } // constructor
    activate() {
        let depid = this.userInfo.departementid;
        this.modelItem.departementid = depid;
        this.update_title();
        if ((this.departements.length > 0)) {
            return super.activate();
        }
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if ((pPers === undefined) || (pPers === null)) {
            this._depelem = null;
            this.departements = [];
            return true;
        }
        let name = this.userInfo.username;
        let bSuper = ((name !== null) && (name == 'admin')) ? true : false;
        let service = this.dataService;
        let self = this;
        let dep = new Departement();
        if (bSuper) {
            return service.get_all_items(dep).then((rr) => {
                self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
            });
        }
        else {
            let ids = ((pPers.departementids !== undefined) &&
                (pPers.departementids !== null) &&
                (pPers.departementids.length > 0)) ? pPers.departementids : [];
            if (ids.length < 1) {
                return super.activate();
            }
            else {
                return service.find_items_array(ids).then((rr) => {
                    self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                });
            }
        }
    } // activate
    get departement_elem() {
        return this._depelem;
    }
    set departement_elem(s) {
        this._depelem = (s !== undefined) ? s : null;
        let id = (this._depelem !== null) ? this._depelem.id : null;
        this.modelItem.departementid = id;
        this.userInfo.departementid = id;
        this.current_item = this.create_item();
        this.update_title();
        this.refreshAll();
    }
    update_title() {
        let s = (this.base_title !== null) ? this.base_title : '';
        let p = this.departement_elem;
        if ((p !== null) && (p.text !== null)) {
            s = s + ' ' + p.text;
        }
        this.title = s;
    } // update_title
    get departementid() {
        return this.userInfo.departementid;
    }
    get hasDepartement() {
        return (this.departementid !== null);
    }
    set hasDepartement(b) {
    }
    create_item() {
        let model = this.modelItem;
        let p = this.generator.create_item({ type: model.type, departementid: this.departementid });
        return p;
    } // create_item
    get canAdd() {
        return (!this.add_mode) && (this.departementid !== null);
    }
    set canAdd(s) {
    }
}
 // class DepSigleNameModel
