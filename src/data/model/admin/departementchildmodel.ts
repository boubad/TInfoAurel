//departementchildmodel.ts
import {IBaseItem, IDepartementChildItem} from '../../../infodata.d';
//
import {PagedViewModel} from './pagedviewmodel';
import {Departement} from '../../domain/departement';
import {InfoRoot} from '../../inforoot';
//
export class DepartementChildModel extends PagedViewModel {
  private _departement: IBaseItem;
  public departements: IBaseItem[];
  public base_title: string;
  //
  constructor(model: IDepartementChildItem) {
    super(model);
    this._departement = null;
    this.departements = [];
    this.base_title = null;
  }// constructor
  protected post_change_departement(): any {
        return this.refreshAll();
    }// post_change_departement
    protected create_item(): IBaseItem {
        let p = super.create_item();
        p.departementid = this.departementid;
        return p;
  }// create_item
    //
    public get departement(): IBaseItem {
        if (this._departement === null) {
            this._departement = new Departement();
        }
        return this._departement;
    }
    public set departement(s: IBaseItem) {
        this._departement = ((s !== undefined) && (s !== null)) ? s : new Departement();
        this.userInfo.departementid = this._departement.id;
        this.modelItem.departementid = this._departement.id;
        let x = this.current_item;
        if (x !== null){
            x.departementid = this._departement.id;
        }
        this.post_change_departement();
    }
    public get hasDepartements(): boolean {
        return ((this.departements !== null) && (this.departements !== null) &&
            (this.departements.length > 0));
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    public activate(params?:any,queryString?:any,routeConfig?:any) : any {
            let userinfo = this.userInfo;
            let id = userinfo.departementid;
            if (this.departements.length > 0){
                let dep = InfoRoot.sync_array(this.departements,id);
                this.departement = dep;
                return Promise.resolve(true);
            }
            let self = this;
            return this.fill_departements().then((r)=>{
                let dep = InfoRoot.sync_array(this.departements,id);
                this.departement = dep;
                return true;
                });
        }// activate
    protected fill_departements(): any {
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if ((pPers === undefined) || (pPers === null)) {
            this.departements = [];
            return Promise.resolve(true);
        }
        let bSuper = pPers.is_super;
        let service = this.dataService;
        let self = this;
        if (bSuper) {
            let model = new Departement();
            return service.get_all_items(model).then((rr) => {
                self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                return true;
            });
        } else {
            let ids = ((pPers.departementids !== undefined) &&
                (pPers.departementids !== null) &&
                (pPers.departementids.length > 0)) ? pPers.departementids : [];
            if (ids.length < 1) {
                return Promise.resolve(true);
            } else {
                return service.find_items_array(ids).then((rr) => {
                    self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                    return true;
                });
            }
        }
    }// fill_departements
  protected update_title(): void {
    let s = (this.base_title !== null) ? this.base_title : '';
    let p = this.departement;
    if ((p !== null) && (p.text !== null)) {
      s = s + ' ' + p.text;
    }
    this.title = s;
  } // update_title
  public get canAdd(): boolean {
    return (!this.add_mode) && (this.departementid !== null);
  }
  public set canAdd(s: boolean) {
  }
}// class DepSigleNameModel
