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
  protected fill_annees(): any {
        let depid = this.departementid;
        if (depid === null){
          this.annees = [];
          this.annee = null;
          return Promise.resolve(true);
        } 
        let model = new Annee({departementid:depid});
        let self = this;
        return this.dataService.get_all_items(model).then((rr)=>{
          self.annees = ((rr !== undefined) && (rr !== null)) ? rr : [];
          self.annee = (self.annees.length > 0) ? self.annees[0] : null;
          });
    }// fill_unites
    protected post_change_departement(): any {
    this.modelItem.departementid = this.departementid;
    return this.fill_annees();
  }// departement_changed    
  protected post_change_item(): any {
    let id = (this.current_item !== null) ? this.current_item.id : null;
    this.userInfo.semestreid = id;
    return true;
  }
  public get annee(): IBaseItem {
    if (this._annee === null){
      this._annee = new Annee({departementid:this.departementid});
    }
    return this._annee;
  }
  public set annee(s: IBaseItem) {
    this._annee = ((s !== undefined) && (s !== null)) ? s : new Annee({departementid:this.departementid});
    let id = this._annee.id;
    this.modelItem.anneeid = id;
    this.userInfo.anneeid = id;
    this.current_item = this.create_item();
    this.refreshAll();
  }
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.annee;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get anneeid(): string {
    let x = this.annee;
    return (x !== null) ? x.id : null;
  }
  public get hasAnnee(): boolean {
    return (this.departementid !== null) && (this.anneeid !== null);
  }
  public set hasAnnee(b: boolean) { }
  protected create_item(): IBaseItem {
    let p = new Semestre({departementid:this.departementid,anneeid:this.anneeid});
    return p;
  }// create_item
  public get canAdd(): boolean {
    return (!this.add_mode) && (this.departementid !== null) && (this.anneeid !== null);
  }
  public set canAdd(s: boolean) {

  }
  public get parentStartDate(): Date {
    return (this.annee !== null) ? this.annee.startDate : null;
  }
  public get parentEndDate(): Date {
    return (this.annee !== null) ? this.annee.endDate : null;
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