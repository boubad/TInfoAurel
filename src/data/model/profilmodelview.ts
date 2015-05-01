//profilmoselview.ts
//
import {IPerson} from '../../infodata.d';
import {InfoRoot} from '../inforoot';
import {BaseViewModel} from './modelbase';
//
interface MyEvent extends EventTarget {
    target: { files: any, result: any };
}
interface MyProgressEvent extends ProgressEvent {
    result: any;
}
//
export class ProfilViewModel extends BaseViewModel {
    //
    private _url: string;
    private filename: string;
    private filetype: string;
    private imageData: Blob;
    //
    public hasUrl: boolean;
    public profilMode: boolean;
    public passwordMode: boolean;
    public avatarMode: boolean;
    public newPassword: string;
    public confirmPassword: string;
    //
    constructor() {
        super();
        this.title = 'Profil';
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
        //
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
        //
        this.newPassword = null;
        this.confirmPassword = null;
    }// constructor
    public get description(): string {
        return this.userInfo.description;
    }
    public set description(s: string) {
        this.userInfo.description = s;
    }
    public get phone(): string {
        return this.userInfo.phone;
    }
    public set phone(s: string) {
        this.userInfo.phone = s;
    }
    public get email(): string {
        return this.userInfo.email;
    }
    public set email(s: string) {
        this.userInfo.email = s;
    }
    public get personid(): string {
        return this.userInfo.personid;
    }
    public get firstname(): string {
        return this.userInfo.firstname;
    }
    public get avatarid(): string {
        return this.userInfo.avatarid;
    }
    public set firstname(s: string) {
        this.userInfo.firstname = s;
    }
    public get lastname(): string {
        return this.userInfo.lastname;
    }
    public set lastname(s: string) {
        this.userInfo.lastname = s;
    }
    public get oldUrl(): string {
        return this.userInfo.photoUrl;
    }
    public set oldUrl(s: string) {
        this.userInfo.photoUrl = s;
    }
    public get hasOldUrl(): boolean {
        return this.userInfo.hasPhoto;
    }
    public set hasOldUrl(s: boolean) { }
    public set_profil(): any {
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
    }
    public set_password(): any {
        this.profilMode = false;
        this.passwordMode = true;
        this.avatarMode = false;
    }
    public set_avatar(): any {
        this.profilMode = false;
        this.passwordMode = false;
        this.avatarMode = true;
    }
    public reset_data(): any {
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }
    public canActivate(): boolean {
        return this.isConnected;
    }
    public activate(): any {
        this.reset_data();
        return true;
    }
    public get canChangePwd(): boolean {
        return (this.newPassword !== null) && (this.confirmPassword !== null) && (this.newPassword == this.confirmPassword) &&
            (this.newPassword.trim().length > 0);
    }
    public changePwd(): any {
        let self = this;
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        pPers.change_password(this.newPassword);
        this.clear_error();
        return this.dataService.maintains_item(pPers).then((r) => {
            self.infoMessage = 'Mot de passe modifié!';
            self.newPassword = null;
            self.confirmPassword = null;
        }, (err) => {
                self.set_error(err);
            });
    }
    public get canSaveData(): boolean {
        return (this.firstname !== null) && (this.firstname.trim().length > 0) &&
            (this.lastname !== null) && (this.lastname.trim().length > 0);
    }
    public saveData(): any {
        let self = this;
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        this.clear_error();
        return this.dataService.maintains_item(pPers).then((r) => {
            self.infoMessage = 'Informations enregistrées!';
        }, (err) => {
                self.set_error(err);
            });
    }// saveData
    public get url(): string {
        return this._url;
    }
    public set url(s: string) {
        if (this._url !== null) {
            InfoRoot.revokeUrl(this._url);
        }
        this._url = s;
    }
    public get canRemove(): boolean {
        return (this.personid !== null) && (this.avatarid !== null);
    }
    public get canSave(): boolean {
        return (this.url !== null) && (this.personid !== null) &&
            (this.imageData !== null) && (this.filename !== null) && (this.filetype !== null);
    }
    public fileChanged(event: MyEvent): any {
        let self = this;
        let files = event.target.files;
        if ((files !== undefined) && (files !== null) && (files.length > 0)) {
            let file = files[0];
            let fr = new FileReader();
            fr.onloadend = (e: any) => {
                let data = e.target.result;
                let dd = new Uint8Array(data);
                let blob = new Blob([dd]);
                self.imageData = blob;
                self.url = InfoRoot.createUrl(blob);
                self.hasUrl = true;
                self.filename = file.name;
                self.filetype = file.type;
            };
            fr.readAsArrayBuffer(file);
        }// files
    }// fileChanged
    public remove(): any {
        if (InfoRoot.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let userinfo = this.userInfo;
            let pPers = userinfo.person;
            return this.dataService.remove_attachment(this.personid, this.avatarid).then((r) => {
                userinfo.avatarid = null;
                userinfo.photoUrl = null;
            }, (err) => {
                    self.set_error(err);
                });
        }
    }
    public save(): any {
        let self = this;
        let userinfo = this.userInfo;
        let id = this.personid;
        if (id === null) {
            return;
        }
        let pPers = userinfo.person;
        let service = this.dataService;
        this.clear_error();
        return service.maintains_attachment(id, this.filename, this.imageData, this.filetype).then((r) => {
            pPers.avatarid = self.filename;
            pPers.avatardocid = id;
            return service.maintains_item(pPers);
        }).then((p: IPerson) => {
            self.userInfo.person = p;
            self.reset_data();
        });
    }// save
}// class AvatarModelClass