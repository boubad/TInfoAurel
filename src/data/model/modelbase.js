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
            window.revokeObjectURL(s);
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
        }
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
}
