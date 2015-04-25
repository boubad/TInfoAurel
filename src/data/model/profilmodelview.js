import { BaseViewModel } from './modelbase';
export class ProfilViewModel extends BaseViewModel {
    constructor() {
        super();
        this.title = 'Avatar';
        this.personid = null;
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
        this.avatarid = null;
        this.oldUrl = null;
        this.hasOldUrl = false;
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.phone = null;
        this.description = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }
    set_profil() {
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
    }
    set_password() {
        this.profilMode = false;
        this.passwordMode = true;
        this.avatarMode = false;
    }
    set_avatar() {
        this.profilMode = false;
        this.passwordMode = false;
        this.avatarMode = true;
    }
    reset_data() {
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
    }
    fill_data() {
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
        }
        else {
            this.personid = null;
            this._url = null;
            this.imageData = null;
            this.hasUrl = false;
            this.filename = null;
            this.filetype = null;
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
    canActivate() {
        return this.isConnected;
    }
    activate() {
        this.reset_data();
        this.fill_data();
        return true;
    }
    get canChangePwd() {
        return (this.newPassword !== null) && (this.confirmPassword !== null) && (this.newPassword == this.confirmPassword) &&
            (this.newPassword.trim().length > 0);
    }
    changePwd() {
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
    get canSaveData() {
        return (this.firstname !== null) && (this.firstname.trim().length > 0) &&
            (this.lastname !== null) && (this.lastname.trim().length > 0);
    }
    saveData() {
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
    }
    get url() {
        return this._url;
    }
    set url(s) {
        if (this._url !== null) {
            this.revokeUrl(this._url);
        }
        this._url = s;
    }
    get canRemove() {
        return (this.personid !== null) && (this.avatarid !== null);
    }
    get canSave() {
        return (this.url !== null) && (this.personid !== null) &&
            (this.imageData !== null) && (this.filename !== null) && (this.filetype !== null);
    }
    fileChanged(event) {
        let self = this;
        let files = event.target.files;
        if ((files !== undefined) && (files !== null) && (files.length > 0)) {
            let file = files[0];
            let fr = new FileReader();
            fr.onloadend = (e) => {
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
        }
    }
    remove() {
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
    save() {
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
    }
}
