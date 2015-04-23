import { IntervalViewModel } from './intervalviewmodel';
import { Semestre } from '../../domain/semestre';
import { Annee } from '../../domain/annee';
export class SemestreViewModel extends IntervalViewModel {
    constructor() {
        super(new Semestre());
        this._annee = null;
        this.annees = [];
        this.base_title = 'Semestres';
    }
    departement_changed() {
        let id = this.departementid;
        this.annees = [];
        this._annee = null;
        this.userInfo.anneeid = null;
        if (id === null) {
            return;
        }
        let self = this;
        let item = new Annee({ departementid: this.departementid });
        this.dataService.get_all_items(item).then((aa) => {
            self.annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
        });
    }
    post_change_item() {
        let id = (this.current_item !== null) ? this.current_item.id : null;
        this.userInfo.semestreid = id;
        return true;
    }
    get annee_elem() {
        return this._annee;
    }
    set annee_elem(s) {
        this._annee = (s !== undefined) ? s : null;
        let id = (this._annee !== null) ? this._annee.id : null;
        this.modelItem.anneeid = id;
        this.userInfo.anneeid = id;
        this.current_item = this.create_item();
        this.update_title();
        this.refreshAll();
    }
    update_title() {
        let s = (this.base_title !== null) ? this.base_title : '';
        let p = this.annee_elem;
        if ((p !== null) && (p.text !== null)) {
            s = s + ' ' + p.text;
        }
        this.title = s;
    }
    get anneeid() {
        return this.userInfo.anneeid;
    }
    get hasAnnee() {
        return (this.departementid !== null) && (this.anneeid !== null);
    }
    set hasAnnee(b) {
    }
    create_item() {
        let model = this.modelItem;
        let p = this.generator.create_item({
            type: model.type,
            departementid: this.departementid, anneeid: this.anneeid
        });
        return p;
    }
    get canAdd() {
        return (!this.add_mode) && (this.departementid !== null) && (this.anneeid !== null);
    }
    set canAdd(s) {
    }
    get parentStartDate() {
        return (this.annee_elem !== null) ? this.annee_elem.startDate : null;
    }
    get parentEndDate() {
        return (this.annee_elem !== null) ? this.annee_elem.endDate : null;
    }
    get canSave() {
        let x = this.current_item;
        let bRet = (x !== null) && (x.is_storeable !== undefined) && (x.is_storeable() == true);
        if (!bRet) {
            return false;
        }
        let d01 = (this.parentStartDate !== null) ? Date.parse(this.parentStartDate.toString()) : null;
        let d02 = (this.parentEndDate !== null) ? Date.parse(this.parentEndDate.toString()) : null;
        if ((d01 === null) || (d02 === null)) {
            return false;
        }
        if (isNaN(d01) || isNaN(d02)) {
            return false;
        }
        let t1 = Date.parse(x.startDate.toString());
        let t2 = Date.parse(x.endDate.toString());
        return (t1 >= d01) && (t1 < d02) && (t2 >= d01) && (t2 <= d02) && (t1 <= t2);
    }
    set canSave(s) {
    }
    get anneeStartDate() {
        return (this.parentStartDate !== null) ? this.date_to_string(this.parentStartDate) : null;
    }
    get anneeEndDate() {
        return (this.parentEndDate !== null) ? this.date_to_string(this.parentEndDate) : null;
    }
    get anneeStatus() {
        let s1 = this.anneeStartDate;
        let s2 = this.anneeEndDate;
        return ((s1 !== null) && (s2 !== null)) ? s1 + ' / ' + s2 : null;
    }
}
