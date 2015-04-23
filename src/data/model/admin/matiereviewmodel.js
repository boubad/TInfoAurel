import { DepSigleNameModel } from './depsiglenamemodel';
import { Unite } from '../../domain/unite';
import { Matiere } from '../../domain/matiere';
//
export class MatiereViewModel extends DepSigleNameModel {
    //
    constructor() {
        super(new Matiere());
        this._unite = null;
        this.unites = [];
        this.base_title = 'Matières';
    } // constructor
    departement_changed() {
        let id = this.departementid;
        this.unites = [];
        this._unite = null;
        this.userInfo.uniteid = null;
        if (id === null) {
            return;
        }
        let self = this;
        let item = new Unite({ departementid: this.departementid });
        this.dataService.get_all_items(item).then((aa) => {
            self.unites = ((aa !== undefined) && (aa !== null)) ? aa : [];
        });
    } // departement_changed    
    post_change_item() {
        let id = (this.current_item !== null) ? this.current_item.id : null;
        this.userInfo.matiereid = id;
        return true;
    }
    get unite_elem() {
        return this._unite;
    }
    set unite_elem(s) {
        this._unite = (s !== undefined) ? s : null;
        let id = (this._unite !== null) ? this._unite.id : null;
        this.modelItem.uniteid = id;
        this.userInfo.uniteid = id;
        this.current_item = this.create_item();
        this.update_title();
        this.refreshAll();
    }
    update_title() {
        let s = (this.base_title !== null) ? this.base_title : '';
        let p = this.unite_elem;
        if ((p !== null) && (p.text !== null)) {
            s = s + ' ' + p.text;
        }
        this.title = s;
    } // update_title
    get uniteid() {
        return this.userInfo.uniteid;
    }
    get hasUnite() {
        return (this.departementid !== null) && (this.uniteid !== null);
    }
    set hasUnite(b) {
    }
    create_item() {
        let model = this.modelItem;
        let p = this.generator.create_item({
            type: model.type,
            departementid: this.departementid, uniteid: this.uniteid
        });
        return p;
    } // create_item
    get canAdd() {
        return (!this.add_mode) && (this.departementid !== null) && (this.uniteid !== null);
    }
    set canAdd(s) {
    }
    get genre() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.genre : null;
    }
    set genre(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.genre = s;
        }
    }
    get mat_module() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.mat_module : null;
    }
    set mat_module(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.mat_module = s;
        }
    }
    get coefficient() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.coefficient : null;
    }
    set coefficient(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.coefficient = s;
        }
    }
    get ecs() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.ecs : null;
    }
    set ecs(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.ecs = s;
        }
    }
}
 // class DepSigleNameModel
