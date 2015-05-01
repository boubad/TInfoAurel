//modelbase.ts
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {Router, Redirect} from 'aurelia-router';
//
import {IBaseItem,
IOptionDesc, IItemGenerator, IPerson, IDatabaseManager} from '../../infodata.d';
import {DataService} from '../services/dataservice';
import {ItemGenerator} from '../domain/itemgenerator';
import {UserInfo} from './userinfo';
import {InfoRoot} from '../inforoot';
//
export class BaseViewModel extends InfoRoot {
    //
    private _userinfo: UserInfo;
    private _dataService: IDatabaseManager;
    private _gen: IItemGenerator;
    //
    public title: string;
    public errorMessage: string;
    public infoMessage: string;
    public _genresCours: IOptionDesc[];
    public _genresEvts: IOptionDesc[];
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
    }// constructor
    public get genresEvts(): IOptionDesc[] {
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
    public get genresCours(): IOptionDesc[] {
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
    public activate(params?: any, queryString?: any, routeConfig?: any): any {
        return Promise.resolve(true);
    }// activate
    public get generator(): IItemGenerator {
        if (this._gen === null) {
            this._gen = new ItemGenerator();
        }
        return this._gen;
    }
    public get userInfo(): UserInfo {
        if (this._userinfo === null) {
            this._userinfo = new UserInfo();
        }
        return this._userinfo;
    }// userInfo
    public get dataService(): IDatabaseManager {
        if (this._dataService === null) {
            this._dataService = new DataService();
        }
        return this._dataService;
    }	// dataService
    protected update_title(): void {
    } // update_title
    public get hasErrorMessage(): boolean {
        return (this.errorMessage !== null) && (this.errorMessage.trim().length > 0);
    }
    public set hasErrorMessage(b: boolean) {

    }
    public get hasInfoMessage(): boolean {
        return (this.infoMessage !== null) && (this.infoMessage.trim().length > 0);
    }
    public set hasInfoMessage(b: boolean) {
    }
    public clear_error(): void {
        this.errorMessage = null;
        this.hasInfoMessage = null;
    }
    public set_error(err: any): void {
        if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            } else if ((err.msg !== undefined) && (err.msg !== null)) {
                this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            } else if ((err.reason !== undefined) && (err.reason !== null)) {
                this.errorMessage = err.reason;
            } else {
                this.errorMessage = JSON.stringify(err);
            }
        } else {
            this.errorMessage = 'Erreur inconnue...';
        }
    } // set_error
    public get isConnected(): boolean {
        let x = this.userInfo;
        return x.isConnected;
    }// isConnected
    public set isConnected(s: boolean) {
    }
    public get isNotConnected(): boolean {
        return (!this.isConnected);
    }
    public set isNotConnected(s: boolean) {
    }
    public disconnect(): any {
        if (InfoRoot.confirm("Voulez-vous vraiment quitter?")) {
            this.userInfo.person = null;
            return new Redirect('#home');
        }
        return false;
    }// disconnect
    public get fullname(): string {
        return this.userInfo.fullname;
    }
    public get photoUrl(): string {
        return this.userInfo.photoUrl;
    }
    public get hasPhoto(): boolean {
        return this.userInfo.hasPhoto;
    }
    public set hasPhoto(s: boolean) {
    }
    public get isSuper(): boolean {
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
    public set isSuper(b: boolean) { }
    public get isAdmin(): boolean {
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
    public set isAdmin(b: boolean) { }
    public get isProf(): boolean {
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
    public set isProf(b: boolean) { }
    protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        let service = this.dataService;
        let self = this;
        return new Promise((resolve, reject) => {
            let docid = item.avatardocid;
            let id = item.avatarid;
            item.url = null;
            if ((docid === null) || (id === null)) {
                resolve(item);
            } else {
                service.find_attachment(docid, id).then((blob) => {
                    if ((blob === undefined) || (blob === null)) {
                        resolve(item);
                    } else {
                        let x = InfoRoot.createUrl(blob);
                        item.url = x;
                        resolve(item);
                    }
                }, (err) => {
                        resolve(item);
                    });
            }
        });
    }// retrieve_one_avatar
    protected retrieve_avatars(elems: IBaseItem[]): Promise<IBaseItem[]> {
        let pp = [];
        for (let elem of elems) {
            pp.push(this.retrieve_one_avatar(elem));
        }
        return Promise.all(pp);
    }// retrieve_avatars
}// class BaseViewModel