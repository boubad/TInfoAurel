//profilmoselview.ts
//
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
    private personid: string;
    private _url: string;
    private filename: string;
    private filetype: string;
    private imageData: Blob;
    private avatarid: string;
    //
    public hasUrl: boolean;
    public oldUrl: string;
    public hasOldUrl: boolean;
    public profilMode: boolean;
    public passwordMode: boolean;
    public avatarMode: boolean;
    public firstname: string;
    public lastname: string;
    public email: string;
    public phone: string;
    public description: string;
    public newPassword: string;
    public confirmPassword: string;
    //
    constructor() {
        super();
        this.title = 'Avatar';
        this.personid = null;
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
        //
        this.avatarid = null;
        this.oldUrl = null;
        this.hasOldUrl = false;
        //
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
        //
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.phone = null;
        this.description = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }// constructor
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
    }
    public fill_data(): any {
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if (pPers !== null) {
            this.avatarid = pPers.avatarid;
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.email = pPers.email;
            this.phone = pPers.phone;
            this.description = pPers.description;
            this.oldUrl = userinfo.photoUrl;
            this.hasOldUrl = (this.oldUrl !== null);
        } else {
            this.personid = null;
            this._url = null;
            this.imageData = null;
            this.hasUrl = false;
            this.filename = null;
            this.filetype = null;
            //
            this.avatarid = null;
            this.oldUrl = null;
            this.hasOldUrl = false;
            this.firstname = null;
            this.lastname = null;
            this.email = null;
            this.phone = null;
            this.description = null;
            this.newPassword = null;
            this.confirmPassword = null;
        }
    }
    public canActivate(): boolean {
        return this.isConnected;
    }
    public activate(): any {
        this.reset_data();
        this.fill_data();
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
        pPers.firstname = this.firstname;
        pPers.lastname = this.lastname;
        pPers.email = this.email;
        pPers.phone = this.phone;
        pPers.description = this.description;
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
            this.revokeUrl(this._url);
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
                self.url = this.createUrl(blob);
                self.hasUrl = true;
                self.filename = file.name;
                self.filetype = file.type;
            };
            fr.readAsArrayBuffer(file);
        }// files
    }// fileChanged
    public remove(): any {
        if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let userinfo = this.userInfo;
            let pPers = userinfo.person;
            return this.dataService.remove_attachment(this.personid, this.avatarid).then((r) => {
                pPers.avatarid = null;
                userinfo.person = pPers;
                userinfo.photoUrl = null;
                userinfo.avatarid = null;
                self.oldUrl = null;
                self.hasOldUrl = false;
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
            userinfo.person = pPers;
            userinfo.photoUrl = self.url;
            userinfo.avatarid = self.filename;
            self.oldUrl = self.url;
            self.hasOldUrl = true;
            self.reset_data();
            return service.maintains_item(pPers);
        });
    }// save
}// class AvatarModelClass