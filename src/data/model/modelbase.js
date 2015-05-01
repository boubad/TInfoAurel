import { Redirect } from 'aurelia-router';
import { DataService } from '../services/dataservice';
import { ItemGenerator } from '../domain/itemgenerator';
import { UserInfo } from './userinfo';
import { InfoRoot } from '../inforoot';
//
export class BaseViewModel extends InfoRoot {
    //
    constructor() {
        super();
        this._userinfo = null;
        this._dataService = null;
        this._gen = null;
        this.infoMessage = null;
        this.errorMessage = null;
        this._genresCours = null;
        this._genresEvts = null;
    } // constructor
    get genresEvts() {
        if (this._genresEvts === null) {
            this._genresEvts = [{ text: 'Note', value: 'note' },
                { text: 'Absence', value: 'abs' },
                { text: 'Retard léger', value: 'ret1' },
                { text: 'Grand Retard', value: 'ret2' },
                { text: 'Comportement', value: 'disc' },
                { text: 'Autre', value: 'autre' }];
        }
        return this._genresEvts;
    }
    get genresCours() {
        if (this._genresCours === null) {
            this._genresCours = [
                {
                    text: 'Travaux Pratiques', value: 'TP'
                },
                {
                    text: 'Travaux Dirigés', value: 'TD'
                },
                {
                    text: 'Cours Magistral', value: 'COURS'
                },
                {
                    text: 'Contrôle', value: 'CONTROL'
                },
                {
                    text: 'Examen', value: 'EXAM'
                },
                {
                    text: 'Devoir facultatif', value: 'FACUL'
                },
                {
                    text: 'Autres types', value: 'MISC'
                }
            ];
        }
        return this._genresCours;
    }
    activate(params, queryString, routeConfig) {
        return Promise.resolve(true);
    } // activate
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
    } // userInfo
    get dataService() {
        if (this._dataService === null) {
            this._dataService = new DataService();
        }
        return this._dataService;
    } // dataService
    update_title() {
    } // update_title
    get hasErrorMessage() {
        return (this.errorMessage !== null) && (this.errorMessage.trim().length > 0);
    }
    set hasErrorMessage(b) {
    }
    get hasInfoMessage() {
        return (this.infoMessage !== null) && (this.infoMessage.trim().length > 0);
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
    } // set_error
    get isConnected() {
        let x = this.userInfo;
        return x.isConnected;
    } // isConnected
    set isConnected(s) {
    }
    get isNotConnected() {
        return (!this.isConnected);
    }
    set isNotConnected(s) {
    }
    disconnect() {
        if (InfoRoot.confirm("Voulez-vous vraiment quitter?")) {
            this.userInfo.person = null;
            return new Redirect('#home');
        }
        return false;
    } // disconnect
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
                        let x = InfoRoot.createUrl(blob);
                        item.url = x;
                        resolve(item);
                    }
                }, (err) => {
                    resolve(item);
                });
            }
        });
    } // retrieve_one_avatar
    retrieve_avatars(elems) {
        let pp = [];
        for (let elem of elems) {
            pp.push(this.retrieve_one_avatar(elem));
        }
        return Promise.all(pp);
    } // retrieve_avatars
}
 // class BaseViewModel
