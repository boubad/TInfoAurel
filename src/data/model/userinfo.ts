//userinfo.ts
//
import {IBaseItem, IPerson} from '../../infodata.d';
import {SessionObjectStore} from './sessionstore';
import {Person} from '../domain/person';
import {EtudiantPerson} from '../domain/etudperson';
import {InfoRoot} from '../inforoot';
//
export class UserInfo extends SessionObjectStore {
    private _person: IPerson;
    //
    constructor() {
        super();
        this._person = null;
    }// constructor
    public get username(): string {
        let x = this.person;
        return (x !== null) ? x.username : null;
    }
    public set username(s: string) {
        let x = this._person;
        if (x !== null) {
            x.username = s;
        }
    }
    public get description(): string {
        let x = this.person;
        return (x !== null) ? x.description : null;
    }
    public set description(s: string) {
        let x = this.person;
        if (x !== null) {
            x.description = s;
        }
    }
    public get phone(): string {
        let x = this.person;
        return (x !== null) ? x.phone : null;
    }
    public set phone(s: string) {
        let x = this.person;
        if (x !== null) {
            x.phone = s;
        }
    }
    public get email(): string {
        let x = this.person;
        return (x !== null) ? x.email : null;
    }
    public set email(s: string) {
        let x = this.person;
        if (x !== null){
          x.email = s;
        }
    }
    public get fullname(): string {
        let x = this.person;
        return (x !== null) ? x.fullname : null;
    }
    public set fullname(s: string) {
    }
    public get lastname(): string {
        let x = this.person;
        return (x !== null) ? x.lastname : null;
    }
    public set lastname(s: string) {
        let x = this.person;
        if (x !== null) {
            x.lastname = s;
        }
    }
    public get firstname(): string {
        let x = this.person;
        return (x !== null) ? x.firstname : null;
    }
    public set firstname(s: string) {
        let x = this.person;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get photoUrl(): string {
        let x = this.person;
        return (x !== null) ? x.url : null;
    }
    public set photoUrl(s: string) {
        let x = this.person;
        if (x !== null) {
            let old = x.url;
            if (old !== null) {
                InfoRoot.revokeUrl(old);
            }
            x.url = ((s !== undefined) && (s !== null)) ? s : null;
        }
    }
    public get hasPhoto(): boolean {
        return (this.photoUrl !== null);
    }
    public set hasPhoto(s: boolean) { }
    public get groupeid(): string {
        return super.get_value('groupeid');
    }
    public set groupeid(s: string) {
        super.store_value('groupeid', s);
    }
    public get matiereid(): string {
        return super.get_value('matiereid');
    }
    public set matiereid(s: string) {
        super.store_value('matiereid', s);
    }
    public get uniteid(): string {
        return super.get_value('uniteid');
    }
    public set uniteid(s: string) {
        super.store_value('uniteid', s);
        this.matiereid = null;
    }
    public get semestreid(): string {
        return super.get_value('semestreid');
    }
    public set semestreid(s: string) {
        super.store_value('semestreid', s);
    }
    public get anneeid(): string {
        return super.get_value('anneeid');
    }
    public set anneeid(s: string) {
        super.store_value('anneeid', s);
        this.semestreid = null;
    }
    public get departementid(): string {
        return super.get_value('departementid');
    }
    public set departementid(s: string) {
        super.store_value('departementid', s);
        this.anneeid = null;
        this.groupeid = null;
        this.uniteid = null;
    }
    public get personid(): string {
        let x = this.person;
        return (x !== null) ? x.id : null;
    }
    public set personid(s: string) {
    }
    public get personrev(): string {
        let x = this.person;
        return (x !== null) ? x.rev : null;
    }
    public set personrev(s: string) {
    }
    public get password(): string {
        let x = this.person;
        return (x !== null) ? x.password : null;
    }
    public set password(s: string) {
    }
    public get avatarid(): string {
        let x = this.person;
        return (x !== null) ? x.avatarid : null;
    }
    public set avatarid(s: string) {
        let x = this.person;
        if (x !== null) {
            x.avatarid = s;
        }
    }
    public get enseignantid(): string {
        return super.get_value("enseignantid");
    }
    public set enseignantid(s: string) {
        super.store_value("enseignantid", s);
    }
    public get etudiantid(): string {
        return super.get_value("etudiantid");
    }
    public set etudiantid(s: string) {
        super.store_value("etudiantid", s);
    }
    //
    public get person(): IPerson {
        if (this._person !== null) {
            return this._person;
        }
        let sval = super.get_value('person');
        if (sval === null) {
            return null;
        }
        try {
            let oMap = JSON.parse(sval);
            if (oMap.type === undefined) {
                return null;
            }
            if (oMap.type == 'etudperson') {
                this._person = new EtudiantPerson(oMap);
            } else {
                this._person = new Person(oMap);
            }
        } catch (e) {
            console.log('UserInfo get person error: ' + JSON.stringify(e));
        }
        return this._person;
    }
    public set person(pPers: IPerson) {
        let p: IPerson = (pPers !== undefined) ? pPers : null;
        super.remove_value('person');
        this._person = null;
        this.departementid = null;
        this.anneeid = null;
        this.semestreid = null;
        this.uniteid = null;
        this.matiereid = null;
        this.groupeid = null;
        this.enseignantid = null;
        this.etudiantid = null;
        if ((p !== null) && (p.id !== null)) {
            let oMap = {};
            p.to_map(oMap);
            super.store_value('person', JSON.stringify(oMap));
        }
    }
    public get isConnected() {
        let p = this.person;
        return ((p !== undefined) && (p !== null) && (p.id !== undefined) && (p.id !== null));
    }// isConnected
    public set isConnected(s: boolean) { }
}// class UserInfo