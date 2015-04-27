//modelbase.ts
//
import {Router, Redirect} from 'aurelia-router';
//
import {IBaseItem,
IItemGenerator, IElementDesc, IPerson, IDatabaseManager} from '../../infodata.d';
import {DataService} from '../services/dataservice';
import {ItemGenerator} from '../domain/itemgenerator';
import {UserInfo} from './userinfo';
//
declare var window: any;
//
export class BaseViewModel {
    //
    private _userinfo: UserInfo;
    private _dataService: IDatabaseManager;
    private _gen: IItemGenerator;
    //
    public title: string;
    public errorMessage: string;
    public infoMessage: string;
    //
    constructor() {
        this._userinfo = null;
        this._dataService = null;
        this._gen = null;
        this.infoMessage = null;
        this.errorMessage = null;
    }// constructor
    public activate(params?:any,queryString?:any,routeConfig?:any) : any {
            return Promise.resolve(true);
        }// activate
    protected sync_array(cont: IBaseItem[], id: string): IBaseItem {
        let pSel: IBaseItem = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_departements
    protected string_to_date(s: string): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    protected date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            } catch (e) { }
        }
        return sRet;
    }
    protected number_to_string(n:number) : string{
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    protected string_to_number(s:string) : number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)){
            try {
                let x = parseFloat(s);
                if (!isNaN(x)){
                    dRet = x;
                }
              }catch(e){}
          }// s
        return dRet;
    }
    protected confirm(message: string): boolean {
        return window.confirm(message);
    }
    protected createUrl(blob: Blob): string {
        let sRet: string = null;
        if ((blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            } catch (e) {
                console.log(e.toString());
            }
        }
        return sRet;
    }
    protected revokeUrl(s: string): void {
        if ((s !== undefined) && (s !== null)) {
            try {
                window.URL.revokeObjectURL(s);
            } catch (e) { }
        }
    }
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
        return (this.errorMessage !== null) && (this.errorMessage.length > 0);
    }
    public set hasErrorMessage(b: boolean) {

    }
    public get hasInfoMessage(): boolean {
        return (this.infoMessage !== null) && (this.infoMessage.length > 0);
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
        if (this.confirm("Voulez-vous vraiment quitter?")) {
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
                        let x = self.createUrl(blob);
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
    protected array_add(cont: string[], val: string): string[] {
        let cRet: string[] = [];
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
    }// _array_add
}// class BaseViewModel