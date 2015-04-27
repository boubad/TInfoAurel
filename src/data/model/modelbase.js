import { Redirect } from 'aurelia-router';
import { DataService } from '../services/dataservice';
import { ItemGenerator } from '../domain/itemgenerator';
import { UserInfo } from './userinfo';
export class BaseViewModel {
    constructor() {
        this._userinfo = null;
        this._dataService = null;
        this._gen = null;
        this.infoMessage = null;
        this.errorMessage = null;
    }
    activate(params, queryString, routeConfig) {
        return Promise.resolve(true);
    }
    sync_array(cont, id) {
        let pSel = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }
            }
            if (pSel === null) {
                pSel = cont[0];
            }
        }
        return pSel;
    }
    string_to_date(s) {
        let dRet = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            }
            catch (e) {
            }
        }
        return dRet;
    }
    date_to_string(d) {
        let sRet = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            }
            catch (e) { }
        }
        return sRet;
    }
    number_to_string(n) {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    string_to_number(s) {
        let dRet = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            }
            catch (e) { }
        }
        return dRet;
    }
    confirm(message) {
        return window.confirm(message);
    }
    createUrl(blob) {
        let sRet = null;
        if ((blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            }
            catch (e) {
                console.log(e.toString());
            }
        }
        return sRet;
    }
    revokeUrl(s) {
        if ((s !== undefined) && (s !== null)) {
            try {
                window.URL.revokeObjectURL(s);
            }
            catch (e) { }
        }
    }
    get generator() {
        if (this._gen === null) {
            this._gen = new ItemGenerator();
        }
        return this._gen;
    }
    get userInfo() {
        if (this._userinfo === null) {
            this._userinfo = new UserInfo();
        }
        return this._userinfo;
    }
    get dataService() {
        if (this._dataService === null) {
            this._dataService = new DataService();
        }
        return this._dataService;
    }
    update_title() {
    }
    get hasErrorMessage() {
        return (this.errorMessage !== null) && (this.errorMessage.length > 0);
    }
    set hasErrorMessage(b) {
    }
    get hasInfoMessage() {
        return (this.infoMessage !== null) && (this.infoMessage.length > 0);
    }
    set hasInfoMessage(b) {
    }
    clear_error() {
        this.errorMessage = null;
        this.hasInfoMessage = null;
    }
    set_error(err) {
        if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            }
            else if ((err.msg !== undefined) && (err.msg !== null)) {
                this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            }
            else if ((err.reason !== undefined) && (err.reason !== null)) {
                this.errorMessage = err.reason;
            }
            else {
                this.errorMessage = JSON.stringify(err);
            }
        }
        else {
            this.errorMessage = 'Erreur inconnue...';
        }
    }
    get isConnected() {
        let x = this.userInfo;
        return x.isConnected;
    }
    set isConnected(s) {
    }
    get isNotConnected() {
        return (!this.isConnected);
    }
    set isNotConnected(s) {
    }
    disconnect() {
        if (this.confirm("Voulez-vous vraiment quitter?")) {
            this.userInfo.person = null;
            return new Redirect('#home');
        }
        return false;
    }
    get fullname() {
        return this.userInfo.fullname;
    }
    get photoUrl() {
        return this.userInfo.photoUrl;
    }
    get hasPhoto() {
        return this.userInfo.hasPhoto;
    }
    set hasPhoto(s) {
    }
    get isSuper() {
        let bRet = false;
        let x = this.userInfo;
        if ((x !== undefined) && (x !== null)) {
            let p = x.person;
            if ((p !== undefined) && (p !== null)) {
                bRet = p.is_super;
            }
        }
        return bRet;
    }
    set isSuper(b) { }
    get isAdmin() {
        let bRet = false;
        let x = this.userInfo;
        if ((x !== undefined) && (x !== null)) {
            let p = x.person;
            if ((p !== undefined) && (p !== null)) {
                bRet = p.is_super || p.is_admin;
            }
        }
        return bRet;
    }
    set isAdmin(b) { }
    get isProf() {
        let bRet = false;
        let x = this.userInfo;
        if ((x !== undefined) && (x !== null)) {
            let p = x.person;
            if ((p !== undefined) && (p !== null)) {
                bRet = p.has_role('prof');
            }
        }
        return bRet;
    }
    set isProf(b) { }
    retrieve_one_avatar(item) {
        let service = this.dataService;
        let self = this;
        return new Promise((resolve, reject) => {
            let docid = item.avatardocid;
            let id = item.avatarid;
            item.url = null;
            if ((docid === null) || (id === null)) {
                resolve(item);
            }
            else {
                service.find_attachment(docid, id).then((blob) => {
                    if ((blob === undefined) || (blob === null)) {
                        resolve(item);
                    }
                    else {
                        let x = self.createUrl(blob);
                        item.url = x;
                        resolve(item);
                    }
                }, (err) => {
                    resolve(item);
                });
            }
        });
    }
    retrieve_avatars(elems) {
        let pp = [];
        for (let elem of elems) {
            pp.push(this.retrieve_one_avatar(elem));
        }
        return Promise.all(pp);
    }
    array_add(cont, val) {
        let cRet = [];
        if ((cont === undefined) || (cont === null)) {
            if ((val !== undefined) && (val !== null)) {
                cRet.push(val);
            }
            return cRet;
        }
        if ((val === null) || (val === null)) {
            return cont;
        }
        let bFound = false;
        for (let s of cont) {
            if (s == val) {
                bFound = true;
            }
            cRet.push(s);
        }
        if (!bFound) {
            cRet.push(val);
        }
        return cRet;
    }
}
