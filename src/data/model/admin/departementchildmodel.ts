//departementchildmodel.ts
import {IBaseItem, IDepartementChildItem} from '../../../infodata.d';
//
import {PagedViewModel} from './pagedviewmodel';
import {Departement} from '../../domain/departement';
//
export class DepartementChildModel extends PagedViewModel {
  private _depelem: IBaseItem;
  public departements: IBaseItem[];
  public base_title: string;
  //
  constructor(model: IDepartementChildItem) {
    super(model);
    this._depelem = null;
    this.departements = [];
    this.base_title = null;
  }// constructor
  public activate(): any {
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
        if (self.departements.length > 0){
            self._depelem = self.departements[0];
          }
      });
    } else {
      let ids = ((pPers.departementids !== undefined) &&
        (pPers.departementids !== null) &&
        (pPers.departementids.length > 0)) ? pPers.departementids : [];
      if (ids.length < 1) {
        return super.activate();
      } else {
        return service.find_items_array(ids).then((rr) => {
          self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
          if (self.departements.length > 0){
            self._depelem = self.departements[0];
          }
        });
      }
    }
  }// activate
  protected departement_changed(): void { }
  public get departement_elem(): IBaseItem {
    return this._depelem;
  }
  public set departement_elem(s: IBaseItem) {
    this._depelem = (s !== undefined) ? s : null;
    let id = (this._depelem !== null) ? this._depelem.id : null;
    this.modelItem.departementid = id;
    this.userInfo.departementid = id;
    this.current_item = this.create_item();
    this.departement_changed();
    this.update_title();
    this.refreshAll();
  }
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.departement_elem;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get departementid(): string {
    return (this._depelem !== null) ? this._depelem.id : null;
  }
  public get hasDepartement(): boolean {
    return (this.departementid !== null);
  }
  public set hasDepartement(b: boolean) { }
  protected create_item(): IBaseItem {
    let p = super.create_item();
    p.departementid = this.departementid;
    return p;
  }// create_item
  public get canAdd(): boolean {
    return (!this.add_mode) && (this.departementid !== null);
  }
  public set canAdd(s: boolean) {
  }
}// class DepSigleNameModel
