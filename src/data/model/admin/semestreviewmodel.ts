//semestre-model.ts
import {IBaseItem} from '../../../infodata.d';
//
//
import {IntervalViewModel} from './intervalviewmodel';
import {Semestre} from '../../domain/semestre';
import {Annee} from '../../domain/annee';
//
export class SemestreViewModel extends IntervalViewModel {
  private _annee: IBaseItem;
  public annees: IBaseItem[];
  //
  constructor() {
    super(new Semestre());
    this._annee = null;
    this.annees = [];
    this.base_title = 'Semestres';
  }// constructor
  protected departement_changed(): void {
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
  }// departement_changed    
  protected post_change_item(): any {
    let id = (this.current_item !== null) ? this.current_item.id : null;
    this.userInfo.semestreid = id;
    return true;
  }
  public get annee_elem(): IBaseItem {
    return this._annee;
  }
  public set annee_elem(s: IBaseItem) {
    this._annee = (s !== undefined) ? s : null;
    let id = (this._annee !== null) ? this._annee.id : null;
    this.modelItem.anneeid = id;
    this.userInfo.anneeid = id;
    this.current_item = this.create_item();
    this.update_title();
    this.refreshAll();
  }
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.annee_elem;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get anneeid(): string {
    return this.userInfo.anneeid;
  }
  public get hasAnnee(): boolean {
    return (this.departementid !== null) && (this.anneeid !== null);
  }
  public set hasAnnee(b: boolean) {

  }
  protected create_item(): IBaseItem {
    let model = this.modelItem;
    let p = this.generator.create_item({
      type: model.type,
      departementid: this.departementid, anneeid: this.anneeid
    });
    return p;
  }// create_item
  public get canAdd(): boolean {
    return (!this.add_mode) && (this.departementid !== null) && (this.anneeid !== null);
  }
  public set canAdd(s: boolean) {

  }
  public get parentStartDate(): Date {
    return (this.annee_elem !== null) ? this.annee_elem.startDate : null;
  }
  public get parentEndDate(): Date {
    return (this.annee_elem !== null) ? this.annee_elem.endDate : null;
  }
  public get canSave(): boolean {
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
  public set canSave(s: boolean) {

  }
  public get anneeStartDate(): string {
    return (this.parentStartDate !== null) ? this.date_to_string(this.parentStartDate) : null;
  }
  public get anneeEndDate(): string {
    return (this.parentEndDate !== null) ? this.date_to_string(this.parentEndDate) : null;
  }
  public get anneeStatus(): string {
    let s1 = this.anneeStartDate;
    let s2 = this.anneeEndDate;
    return ((s1 !== null) && (s2 !== null)) ? s1 + ' / ' + s2 : null;
  }
}// class SemestreMdoelClass