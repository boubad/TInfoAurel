import { DepSigleNameModel } from './depsiglenamemodel';
import { Unite } from '../../domain/unite';
import { Matiere } from '../../domain/matiere';
export class MatiereViewModel extends DepSigleNameModel {
    constructor() {
        super(new Matiere());
        this._unite = null;
        this.unites = [];
        this.base_title = 'Matières';
    }
    fill_unites() {
        let depid = this.departementid;
        if (depid === null) {
            this.unites = [];
            this.unite = null;
            return Promise.resolve(true);
        }
        let model = new Unite({ departementid: depid });
        let self = this;
        return this.dataService.get_all_items(model).then((rr) => {
            self.unites = ((rr !== undefined) && (rr !== null)) ? rr : [];
            self.unite = (self.unites.length > 0) ? self.unites[0] : null;
        });
    }
    post_change_departement() {
        this.modelItem.departementid = this.departementid;
        return this.fill_unites();
    }
    post_change_item() {
        let id = (this.current_item !== null) ? this.current_item.id : null;
        this.userInfo.matiereid = id;
        return true;
    }
    get unite() {
        return (this._unite !== null) ? this._unite : new Unite({ departementid: this.departementid });
    }
    set unite(s) {
        this._unite = ((s !== undefined) && (s !== null)) ? s : new Unite({ departementid: this.departementid });
        let id = this._unite.id;
        this.modelItem.departementid = this.departementid;
        this.modelItem.uniteid = id;
        this.userInfo.uniteid = id;
        this.current_item = this.create_item();
        this.refreshAll();
    }
    update_title() {
        let s = (this.base_title !== null) ? this.base_title : '';
        let p = this.unite;
        if ((p !== null) && (p.text !== null)) {
            s = s + ' ' + p.text;
        }
        this.title = s;
    }
    get uniteid() {
        let x = this.unite;
        return (x !== null) ? x.id : null;
    }
    get hasUnite() {
        return (this.departementid !== null) && (this.uniteid !== null);
    }
    set hasUnite(b) {
    }
    create_item() {
        let p = new Matiere({ departementid: this.departementid, uniteid: this.uniteid });
        return p;
    }
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
        let v = ((x !== undefined) && (x !== null)) ? x.coefficient : null;
        return this.number_to_string(v);
    }
    set coefficient(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.coefficient = this.string_to_number(s);
        }
    }
    get ecs() {
        let x = this.current_item;
        let v = ((x !== undefined) && (x !== null)) ? x.ecs : null;
        return this.number_to_string(v);
    }
    set ecs(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.ecs = this.string_to_number(s);
        }
    }
}
