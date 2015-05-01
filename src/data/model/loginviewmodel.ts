//loginviewmodel.js
//
import {IPerson} from '../../infodata.d';
import {Redirect} from 'aurelia-router';
import {Person} from '../domain/person';
import {BaseViewModel} from './modelbase';
//
export class LoginViewModel extends BaseViewModel {
    //
    public username: string;
    public password: string;
    //
    constructor() {
        super();
        this.username = null;
        this.password = null;
        this.title = 'Connexion';
    }// constructor
    public activate(params?: any, queryString?: any, routeConfig?: any): any {
        return this.dataService.check_admin();
    }// activate
    public get canConnect(): boolean {
        return (this.username !== null) && (this.password !== null) &&
            (this.username.trim().length > 0) && (this.username.trim().length < 32) &&
            (this.password.trim().length > 0);
    }// canConnect
    public get canNotConnect(): boolean {
        return (!this.canConnect);
    }
    public connect(): any {
        let suser = (this.username !== null) ? this.username.trim().toLowerCase() : null;
        let spass = this.password;
        let self = this;
        let xurl: string = '#login';
        this.clear_error();
        return this.dataService.find_person_by_username(suser).then((pPers: IPerson) => {
            let px: IPerson = pPers;
            if ((pPers !== null) && pPers.check_password(spass)) {
                px = pPers;
            } else {
                px = new Person();
            }
            return self.retrieve_one_avatar(px);
        }).then((p: IPerson) => {
            if ((p !== undefined) && (p !== null) && (p.id !== null) && (p.rev !== null)) {
                self.username = null;
                self.password = null;
                if (p.is_admin) {
                    xurl = '#admin_home';
                    self.userInfo.person = p;
                } else if (p.is_prof) {
                    xurl = '#prof_home';
                    self.userInfo.person = p;
                } else if (p.is_etud) {
                    xurl = '#etud_home';
                    self.userInfo.person = p;
                }
            } else {
                self.errorMessage = 'Utilisateur inconnu...';
            }
            return new Redirect(xurl);
        }).catch((err) => {
            self.set_error(err);
            return new Redirect(xurl);
        });      
        //
    }// connect        
}// class LoginClass