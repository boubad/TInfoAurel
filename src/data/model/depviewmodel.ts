//depviewmodel.ts
//
import {IBaseItem, IDepartement} from '../../infodata.d';
import {Departement} from '../domain/departement';
import {InfoRoot} from '../inforoot';
import {BaseViewModel} from './modelbase';
//
export class DepViewModel extends BaseViewModel {
    //
    protected _departement: IDepartement;
    public departements: IDepartement[];
    //
    constructor() {
        super();
        this.departements = [];
        this._departement = null;
    }// constructor
    protected post_change_departement(): any {
        return Promise.resolve(true);
    }// post_change_departement
    //
    public get departement(): IDepartement {
        if (this._departement === null) {
            this._departement = new Departement();
        }
        return this._departement;
    }
    public set departement(s: IDepartement) {
        this._departement = ((s !== undefined) && (s !== null)) ? s : new Departement();
        this.userInfo.departementid = this.departementid;
        this.post_change_departement();
    }
    public get hasDepartements(): boolean {
        return ((this.departements !== null) && (this.departements !== null) &&
            (this.departements.length > 0));
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    public activate(params?: any, queryString?: any, routeConfig?: any): any {
        let userinfo = this.userInfo;
        let id = userinfo.departementid;
        if (this.departements.length > 0) {
            let dep = InfoRoot.sync_array(this.departements, id);
            if (dep !== null) {
                let oMap: any = {};
                dep.to_map(oMap);
                this.departement = new Departement(oMap);
            } else {
                this.departement = null;
            }
            return Promise.resolve(true);
        }
        let self = this;
        return this.fill_departements().then((r) => {
            let dep = InfoRoot.sync_array(this.departements, id);
            if (dep !== null) {
                let oMap: any = {};
                dep.to_map(oMap);
                this.departement = new Departement(oMap);
            } else {
                this.departement = null;
            }
            return true;
        });
    }// activate
    protected fill_departements(): Promise<IDepartement[]> {
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if ((pPers === undefined) || (pPers === null)) {
            this.departements = [];
            return Promise.resolve([]);
        }
        let bSuper = pPers.is_super;
        let service = this.dataService;
        let self = this;
        if (bSuper) {
            let model = new Departement();
            return service.get_all_items(model).then((rr: IDepartement[]) => {
                self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                return [];
            });
        } else {
            let ids = ((pPers.departementids !== undefined) &&
                (pPers.departementids !== null) &&
                (pPers.departementids.length > 0)) ? pPers.departementids : [];
            if (ids.length < 1) {
                return Promise.resolve([]);
            } else {
                return service.find_items_array(ids).then((rr: IDepartement[]) => {
                    self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                    return [];
                });
            }
        }
    }// fill_departements
}// class BaseViewModel