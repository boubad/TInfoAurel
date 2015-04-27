// personviewmodel.ts
//
import {IBaseItem, IPerson,IDepartementPerson} from '../../../infodata.d';
//
import {DepartementChildModel} from './departementchildmodel';
import {Departement} from '../../domain/departement';
import {Person} from '../../domain/person';
//
export class PersonViewModel extends DepartementChildModel {
    //
    protected modelPerson: IBaseItem;
    protected _currentPerson: IBaseItem;
    protected currentUrl: string;
    //
    constructor(model: IDepartementPerson, personModel?: IPerson) {
        super(model);
        this.modelPerson = ((personModel !== undefined) && (personModel !== null)) ?
            personModel : new Person();
        this._currentPerson = null;
        this.currentUrl = null;
    }// constructor
    public get hasCurrentPhoto():boolean {
        return (this.currentUrl !== null);
    }
    public set hasCurrentPhoto(s:boolean){}
    public get currentPerson(): IBaseItem {
        if (this._currentPerson === null) {
            this._currentPerson = this.create_person();
        }
        return this._currentPerson;
    }
    public set currentPerson(s: IBaseItem) {
        this._currentPerson = ((s !== undefined) && (s !== null)) ? s :
            this.create_person();
    }
    public addNew(): void {
        super.addNew();
        this.currentPerson = null;
    }// ad
    protected post_change_item(): any {
        if (this.currentUrl !== null){
            this.revokeUrl(this.currentUrl);
        }
        this.currentUrl = null;
        this.currentPerson = null;
        let p = this.current_item;
        if (p === null) {
            return Promise.resolve(true);
        }
        let pid = p.personid;
        if (pid === null) {
            return Promise.resolve(true);
        }
        let self = this;
        let service = this.dataService;
        return service.find_item_by_id(pid).then((pp) => {
            self.currentPerson = pp;
            if ((pp !== undefined) && (pp !== null)){
                let id = pp.id;
                let vid = pp.avatarid;
                if ((id !== null) && (vid !== null)){
                    service.find_attachment(id, vid).then((blob) => { 
                        let xurl = self.createUrl(blob);
                        self.currentUrl = xurl;
                        });
                }
                }// pp
        });
    }// post_change_item
    public get personid(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.id : null;
    }
    protected create_person(): IBaseItem {
        return new Person();
    }
    protected create_item(): IBaseItem {
        let p = super.create_item();
        this._currentPerson = this.create_person();
        p.departementid = this.departementid;
        return p;
    }// create_item
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
        if (!bOld){
            pPers.reset_password();
        }
        let rx = pPers.departementids;
        pPers.departementids = this.array_add(rx, depid);
        this.clear_error();
        return service.maintains_item(pPers).then((r) => {
            item.personid = r.id;
            item.departementid = depid;
            item.firstname = r.firstname;
            item.lastname = r.lastname;
            item.avatardocid = r.id;
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