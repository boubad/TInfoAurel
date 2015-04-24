//matiereviewmodel.ts
import {IBaseItem} from '../../../infodata.d';
//
import {DepSigleNameModel} from './depsiglenamemodel';
import {Unite} from '../../domain/unite';
import {Matiere} from '../../domain/matiere';
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
  protected departement_changed(): void {
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
      if (self.unites.length > 0) {
        self._unite = self.unites[0];
      }
    });
  }// departement_changed    
  protected post_change_item(): any {
    let id = (this.current_item !== null) ? this.current_item.id : null;
    this.userInfo.matiereid = id;
    return true;
  }
  public get unite_elem(): IBaseItem {
    return this._unite;
  }
  public set unite_elem(s: IBaseItem) {
    this._unite = (s !== undefined) ? s : null;
    let id = (this._unite !== null) ? this._unite.id : null;
    this.modelItem.uniteid = id;
    this.userInfo.uniteid = id;
    this.current_item = this.create_item();
    this.update_title();
    this.refreshAll();
  }
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.unite_elem;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get uniteid(): string {
    let x = this.unite_elem;
    return (x !== null) ? x.id : null;
  }
  public get hasUnite(): boolean {
    return (this.departementid !== null) && (this.uniteid !== null);
  }
  public set hasUnite(b: boolean) {

  }
  protected create_item(): IBaseItem {
    let p = super.create_item();
    p.departementid = this.departementid;
    p.uniteid = this.uniteid;
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
  public get coefficient(): number {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.coefficient : null;
  }
  public set coefficient(s: number) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.coefficient = s;
    }
  }
  public get ecs(): number {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.ecs : null;
  }
  public set ecs(s: number) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.ecs = s;
    }
  }
}// class DepSigleNameModel
