//matiereviewmodel.ts
import {IBaseItem} from '../../../infodata.d';
//
import {DepSigleNameModel} from './depsiglenamemodel';
import {Unite} from '../../domain/unite';
import {Matiere} from '../../domain/matiere';
import {InfoRoot} from '../../inforoot';
//
export class MatiereViewModel extends DepSigleNameModel {
  private _unite: IBaseItem;
  public unites: IBaseItem[];
  //
  constructor() {
    super(new Matiere());
    this._unite = null;
    this.unites = [];
    this.base_title = 'Matières';
  }// constructor
  protected fill_unites(): any {
        let depid = this.departementid;
        if (depid === null){
          this.unites = [];
          this.unite = null;
          return Promise.resolve(true);
        } 
        let model = new Unite({departementid:depid});
        let self = this;
        return this.dataService.get_all_items(model).then((rr)=>{
          self.unites = ((rr !== undefined) && (rr !== null)) ? rr : [];
          self.unite = (self.unites.length > 0) ? self.unites[0] : null;
          });
    }// fill_unites
  protected post_change_departement(): any {
    this.modelItem.departementid = this.departementid;
    return this.fill_unites();
  }// departement_changed    
  protected post_change_item(): any {
    let id = (this.current_item !== null) ? this.current_item.id : null;
    this.userInfo.matiereid = id;
    return true;
  }
  public get unite(): IBaseItem {
    return (this._unite !== null) ? this._unite: new Unite({departementid:this.departementid});
  }
  public set unite(s: IBaseItem) {
    this._unite = ((s !== undefined) && (s !== null)) ? s : new Unite({departementid:this.departementid});
    let id = this._unite.id;
    this.modelItem.departementid = this.departementid;
    this.modelItem.uniteid = id;
    this.userInfo.uniteid = id;
    this.current_item = this.create_item();
    this.refreshAll();
  }
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.unite;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get uniteid(): string {
    let x = this.unite;
    return (x !== null) ? x.id : null;
  }
  public get hasUnite(): boolean {
    return (this.departementid !== null) && (this.uniteid !== null);
  }
  public set hasUnite(b: boolean) {

  }
  protected create_item(): IBaseItem {
    let p = new Matiere({departementid: this.departementid, uniteid:this.uniteid});
    return p;
  }// create_item
  public get canAdd(): boolean {
    return (!this.add_mode) && (this.departementid !== null) && (this.uniteid !== null);
  }
  public set canAdd(s: boolean) {
  }
  public get genre(): string {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.genre : null;
  }
  public set genre(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.genre = s;
    }
  }
  public get mat_module(): string {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.mat_module : null;
  }
  public set mat_module(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.mat_module = s;
    }
  }
  public get coefficient(): string {
    let x = this.current_item;
    let v =  ((x !== undefined) && (x !== null)) ? x.coefficient : null;
    return InfoRoot.number_to_string(v);
  }
  public set coefficient(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.coefficient = InfoRoot.string_to_number(s);
    }
  }
  public get ecs(): string {
    let x = this.current_item;
    let v = ((x !== undefined) && (x !== null)) ? x.ecs : null;
    return InfoRoot.number_to_string(v);
  }
  public set ecs(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.ecs = InfoRoot.string_to_number(s);
    }
  }
}// class DepSigleNameModel
