import { SessionObjectStore } from './sessionstore';
import { Person } from '../domain/person';
import { EtudiantPerson } from '../domain/etudperson';
import { InfoRoot } from '../inforoot';
export class UserInfo extends SessionObjectStore {
    constructor() {
        super();
        this._person = null;
    }
    get username() {
        let x = this.person;
        return (x !== null) ? x.username : null;
    }
    set username(s) {
        let x = this._person;
        if (x !== null) {
            x.username = s;
        }
    }
    get description() {
        let x = this.person;
        return (x !== null) ? x.description : null;
    }
    set description(s) {
        let x = this.person;
        if (x !== null) {
            x.description = s;
        }
    }
    get phone() {
        let x = this.person;
        return (x !== null) ? x.phone : null;
    }
    set phone(s) {
        let x = this.person;
        if (x !== null) {
            x.phone = s;
        }
    }
    get email() {
        let x = this.person;
        return (x !== null) ? x.email : null;
    }
    set email(s) {
        let x = this.person;
        if (x !== null) {
            x.email = s;
        }
    }
    get fullname() {
        let x = this.person;
        return (x !== null) ? x.fullname : null;
    }
    set fullname(s) {
    }
    get lastname() {
        let x = this.person;
        return (x !== null) ? x.lastname : null;
    }
    set lastname(s) {
        let x = this.person;
        if (x !== null) {
            x.lastname = s;
        }
    }
    get firstname() {
        let x = this.person;
        return (x !== null) ? x.firstname : null;
    }
    set firstname(s) {
        let x = this.person;
        if (x !== null) {
            x.firstname = s;
        }
    }
    get photoUrl() {
        let x = this.person;
        return (x !== null) ? x.url : null;
    }
    set photoUrl(s) {
        let x = this.person;
        if (x !== null) {
            let old = x.url;
            if (old !== null) {
                InfoRoot.revokeUrl(old);
            }
            x.url = ((s !== undefined) && (s !== null)) ? s : null;
        }
    }
    get hasPhoto() {
        return (this.photoUrl !== null);
    }
    set hasPhoto(s) { }
    get groupeid() {
        return super.get_value('groupeid');
    }
    set groupeid(s) {
        super.store_value('groupeid', s);
    }
    get matiereid() {
        return super.get_value('matiereid');
    }
    set matiereid(s) {
        super.store_value('matiereid', s);
    }
    get uniteid() {
        return super.get_value('uniteid');
    }
    set uniteid(s) {
        super.store_value('uniteid', s);
        this.matiereid = null;
    }
    get semestreid() {
        return super.get_value('semestreid');
    }
    set semestreid(s) {
        super.store_value('semestreid', s);
    }
    get anneeid() {
        return super.get_value('anneeid');
    }
    set anneeid(s) {
        super.store_value('anneeid', s);
        this.semestreid = null;
    }
    get departementid() {
        return super.get_value('departementid');
    }
    set departementid(s) {
        super.store_value('departementid', s);
        this.anneeid = null;
        this.groupeid = null;
        this.uniteid = null;
    }
    get personid() {
        let x = this.person;
        return (x !== null) ? x.id : null;
    }
    set personid(s) {
    }
    get personrev() {
        let x = this.person;
        return (x !== null) ? x.rev : null;
    }
    set personrev(s) {
    }
    get password() {
        let x = this.person;
        return (x !== null) ? x.password : null;
    }
    set password(s) {
    }
    get avatarid() {
        let x = this.person;
        return (x !== null) ? x.avatarid : null;
    }
    set avatarid(s) {
        let x = this.person;
        if (x !== null) {
            x.avatarid = s;
        }
    }
    get enseignantid() {
        return super.get_value("enseignantid");
    }
    set enseignantid(s) {
        super.store_value("enseignantid", s);
    }
    get etudiantid() {
        return super.get_value("etudiantid");
    }
    set etudiantid(s) {
        super.store_value("etudiantid", s);
    }
    get person() {
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
            }
            else {
                this._person = new Person(oMap);
            }
        }
        catch (e) {
            console.log('UserInfo get person error: ' + JSON.stringify(e));
        }
        return this._person;
    }
    set person(pPers) {
        let p = (pPers !== undefined) ? pPers : null;
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
    get isConnected() {
        let p = this.person;
        return ((p !== undefined) && (p !== null) && (p.id !== undefined) && (p.id !== null));
    }
    set isConnected(s) { }
}
