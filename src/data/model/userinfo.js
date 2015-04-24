import { Person } from '../domain/person';
import { SessionObjectStore } from './sessionstore';
//
export class UserInfo extends SessionObjectStore {
    //
    constructor() {
        super();
        this._person = null;
    } // constructor
    get username() {
        return super.get_value('username');
    }
    set username(s) {
        super.store_value('username', s);
    }
    get description() {
        return super.get_value('description');
    }
    set description(s) {
        super.store_value('description', s);
    }
    get phone() {
        return super.get_value('phone');
    }
    set phone(s) {
        super.store_value('phone', s);
    }
    get email() {
        return super.get_value('email');
    }
    set email(s) {
        super.store_value('email', s);
    }
    get fullname() {
        return super.get_value('fullname');
    }
    set fullname(s) {
        super.store_value('fullname', s);
    }
    get lastname() {
        return super.get_value('lastname');
    }
    set lastname(s) {
        super.store_value('lastname', s);
    }
    get firstname() {
        return super.get_value('firstname');
    }
    set firstname(s) {
        super.store_value('firstname', s);
    }
    get photoUrl() {
        return super.get_value('photoUrl');
    }
    set photoUrl(s) {
        let old = super.get_value('photoUrl');
        if (old !== null) {
            window.URL.revokeObjectURL(old);
        }
        super.store_value('photoUrl', s);
    }
    get hasPhoto() {
        return (this.photoUrl !== null);
    }
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
        return super.get_value('personid');
    }
    set personid(s) {
        super.store_value('personid', s);
    }
    get personrev() {
        return super.get_value('personrev');
    }
    set personrev(s) {
        super.store_value('personrev', s);
    }
    get password() {
        return super.get_value('password');
    }
    set password(s) {
        super.store_value('password', s);
    }
    get avatarid() {
        return super.get_value('avatarid');
    }
    set avatarid(s) {
        super.store_value('avatarid', s);
    }
    //
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
            this._person = new Person(oMap);
        }
        catch (e) {
            console.log('UserInfo get person error: ' + JSON.stringify(e));
        }
        return this._person;
    }
    set person(pPers) {
        let p = (pPers !== undefined) ? pPers : null;
        super.store_value('person', null);
        this.photoUrl = null;
        this.avatarid = null;
        this._person = null;
        this.personid = null;
        this.password = null;
        this.personrev = null;
        this.departementid = null;
        this.anneeid = null;
        this.semestreid = null;
        this.uniteid = null;
        this.matiereid = null;
        this.groupeid = null;
        this.firstname = null;
        this.lastname = null;
        this.fullname = null;
        this.username = null;
        this.email = null;
        this.phone = null;
        this.description = null;
        if ((p !== null) && (p.id !== null)) {
            let oMap = {};
            p.to_map(oMap);
            super.store_value('person', JSON.stringify(oMap));
            let docid = p.id;
            this.personid = docid;
            this.personrev = p.rev;
            this.username = p.username;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.fullname = p.fullname;
            this.email = p.email;
            this.phone = p.phone;
            this.password = p.password;
            this.description = p.description;
            this.avatarid = p.avatarid;
        }
    }
    get isConnected() {
        let p = this.person;
        return ((p !== undefined) && (p !== null) && (p.id !== undefined) && (p.id !== null));
    } // isConnected
}
 // class UserInfo
