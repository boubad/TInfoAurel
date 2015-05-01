import { InfoRoot } from '../inforoot';
import { BaseViewModel } from './modelbase';
export class ProfilViewModel extends BaseViewModel {
    constructor() {
        super();
        this.title = 'Profil';
        this._url = null;
        this.imageData = null;
        this.hasUrl = false;
        this.filename = null;
        this.filetype = null;
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
        this.newPassword = null;
        this.confirmPassword = null;
    }
    get description() {
        return this.userInfo.description;
    }
    set description(s) {
        this.userInfo.description = s;
    }
    get phone() {
        return this.userInfo.phone;
    }
    set phone(s) {
        this.userInfo.phone = s;
    }
    get email() {
        return this.userInfo.email;
    }
    set email(s) {
        this.userInfo.email = s;
    }
    get personid() {
        return this.userInfo.personid;
    }
    get firstname() {
        return this.userInfo.firstname;
    }
    get avatarid() {
        return this.userInfo.avatarid;
    }
    set firstname(s) {
        this.userInfo.firstname = s;
    }
    get lastname() {
        return this.userInfo.lastname;
    }
    set lastname(s) {
        this.userInfo.lastname = s;
    }
    get oldUrl() {
        return this.userInfo.photoUrl;
    }
    set oldUrl(s) {
        this.userInfo.photoUrl = s;
    }
    get hasOldUrl() {
        return this.userInfo.hasPhoto;
    }
    set hasOldUrl(s) { }
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
        this.newPassword = null;
        this.confirmPassword = null;
    }
    canActivate() {
        return this.isConnected;
    }
    activate() {
        this.reset_data();
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
            InfoRoot.revokeUrl(this._url);
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
                self.url = InfoRoot.createUrl(blob);
                self.hasUrl = true;
                self.filename = file.name;
                self.filetype = file.type;
            };
            fr.readAsArrayBuffer(file);
        }
    }
    remove() {
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
            return service.maintains_item(pPers);
        }).then((p) => {
            self.userInfo.person = p;
            self.reset_data();
        });
    }
}
