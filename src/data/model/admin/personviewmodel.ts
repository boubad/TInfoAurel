// personviewmodel.ts
//
import {IBaseItem, IPerson} from '../../../infodata.d';
//
import {PagedViewModel} from './pagedviewmodel';
import {Departement} from '../../domain/departement';
import {Person} from '../../domain/person';
//
export class PersonViewModel extends PagedViewModel {
    //
    private _depelem: IBaseItem;
    public departements: IBaseItem[];
    public base_title: string;
    protected modelPerson: IBaseItem;
    protected currentPerson: IBaseItem;
    //
    constructor(model: IBaseItem, personModel?: IPerson) {
        super(model);
        this.modelPerson = ((personModel !== undefined) && (personModel !== null)) ?
            personModel : new Person();
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
                });
            }
        }
    }// activate
    public get departement_elem(): IBaseItem {
        return this._depelem;
    }
    public set departement_elem(s: IBaseItem) {
        this._depelem = (s !== undefined) ? s : null;
        let id = (this._depelem !== null) ? this._depelem.id : null;
        this.modelItem.departementid = id;
        this.userInfo.departementid = id;
        this.current_item = this.create_item();
        this.update_title();
        this.refreshAll();
    }
    public addNew(): void {
        super.addNew();
        this.currentPerson =
        this.generator.create_item({ type: this.modelPerson.type });
    }// ad
    protected post_change_item(): any {
        let p = this.current_item;
        if (p === null) {
            this.currentPerson = this.generator.create_item({ type: this.modelPerson });
            return false;
        }
        let pid = p.personid;
        if (pid === null) {
            this.currentPerson = this.generator.create_item({ type: this.modelPerson });
            return false;
        }
        let self = this;
        this.dataService.find_item_by_id(pid).then((pp) => {
            self.currentPerson = ((pp !== undefined) && (pp !== null)) ? pp :
                self.generator.create_item({ type: self.modelPerson });
        });
        return true;
    }// post_change_item
    protected update_title(): void {
        let s = (this.base_title !== null) ? this.base_title : '';
        let p = this.departement_elem;
        if ((p !== null) && (p.text !== null)) {
            s = s + ' ' + p.text;
        }
        this.title = s;
    } // update_title
    public get departementid(): string {
        return this.userInfo.departementid;
    }
    public get hasDepartement(): boolean {
        return (this.departementid !== null);
    }
    public set hasDepartement(b: boolean) {

    }
    protected create_item(): IBaseItem {
        let model = this.modelItem;
        let p = this.generator.create_item({ type: model.type, departementid: this.departementid });
        return p;
    }// create_item
    public get canAdd(): boolean {
        return (!this.add_mode) && (this.departementid !== null);
    }
    public set canAdd(s: boolean) {

    }
    public get canResetPassword(): boolean {
        let p = this.currentPerson;
        return (p !== undefined) && (p !== null) &&
            (p.id !== null) && (p.rev !== null) &&
            (p.username !== null);
    }
    public get username(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.username;
        }
        return null;
    }
    public set username(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.username = s;
        }
    }
    public get firstname(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.firstname;
        }
        return null;
    }
    public set firstname(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.firstname = s;
        }
    }
    public get lastname(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.lastname;
        }
        return null;
    }
    public set lastname(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.lastname = s;
        }
    }
    public get email(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.email;
        }
        return null;
    }
    public set email(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.email = s;
        }
    }
    public get phone(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.phone;
        }
        return null;
    }
    public set phone(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.phone = s;
        }
    }
    public get description(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.description;
        }
        return null;
    }
    public set description(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.description = s;
        }
    }
    public get canSave(): boolean {
        let x = this.currentPerson;
        return (this.departementid !== null) &&
            (x !== null) && x.is_storeable();
    }
    public set canSave(s: boolean) {
    }
    public save(): any {
        let depid = this.departementid;
        let pPers = this.currentPerson;
        let item = this.current_item;
        if ((depid === null) || (pPers === null) || (item === null)) {
            return false;
        }
        if (!pPers.is_storeable()) {
            return false;
        }
        let self = this;
        let service = this.dataService;
        let bOld = (item.rev !== null);
        this.clear_error();
        return service.maintains_item(pPers).then((r) => {
            item.personid = r.id;
            item.departementid = depid;
            item.firstname = r.firstname;
            item.lastname = r.lastname;
            item.avatarid = r.avatarid;
            return service.maintains_item(item);
        }).then((x) => {
            if (bOld) {
                self.refresh();
            } else {
                self.refreshAll();
            }
        }).catch((err) => {
            self.set_error(err);
        })
    }// save
     public reset_password(): any {
        let pPers = this.currentPerson;
        if (pPers === null) {
            return false;
        }
        if (!pPers.is_storeable()) {
            return false;
        }
        let self = this;
        let service = this.dataService;
        this.clear_error();
        pPers.reset_password();
        return service.maintains_item(pPers).then((r) => {
            self.infoMessage = "Mot de passe réinitialisé!";
        }, (err) => {
                self.set_error(err);
            });
    }// reset_password

}// PersonViewModel