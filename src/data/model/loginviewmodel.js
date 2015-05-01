import { Redirect } from 'aurelia-router';
import { Person } from '../domain/person';
import { BaseViewModel } from './modelbase';
export class LoginViewModel extends BaseViewModel {
    constructor() {
        super();
        this.username = null;
        this.password = null;
        this.title = 'Connexion';
    }
    activate(params, queryString, routeConfig) {
        return this.dataService.check_admin();
    }
    get canConnect() {
        return (this.username !== null) && (this.password !== null) &&
            (this.username.trim().length > 0) && (this.username.trim().length < 32) &&
            (this.password.trim().length > 0);
    }
    get canNotConnect() {
        return (!this.canConnect);
    }
    connect() {
        let suser = (this.username !== null) ? this.username.trim().toLowerCase() : null;
        let spass = this.password;
        let self = this;
        let xurl = '#login';
        this.clear_error();
        return this.dataService.find_person_by_username(suser).then((pPers) => {
            let px = pPers;
            if ((pPers !== null) && pPers.check_password(spass)) {
                px = pPers;
            }
            else {
                px = new Person();
            }
            return self.retrieve_one_avatar(px);
        }).then((p) => {
            if ((p !== undefined) && (p !== null) && (p.id !== null) && (p.rev !== null)) {
                self.username = null;
                self.password = null;
                if (p.is_admin) {
                    xurl = '#admin_home';
                    self.userInfo.person = p;
                }
                else if (p.is_prof) {
                    xurl = '#prof_home';
                    self.userInfo.person = p;
                }
                else if (p.is_etud) {
                    xurl = '#etud_home';
                    self.userInfo.person = p;
                }
            }
            else {
                self.errorMessage = 'Utilisateur inconnu...';
            }
            return new Redirect(xurl);
        }).catch((err) => {
            self.set_error(err);
            return new Redirect(xurl);
        });
    }
}
