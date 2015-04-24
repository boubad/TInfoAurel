//workviewmodel.ts
//
import {IBaseItem} from '../../infodata.d';
import {BaseViewModel} from './modelbase';
import {UserInfo} from './userinfo';
import {Departement} from '../domain/departement';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Semestre} from '../domain/semestre';
import {Matiere} from '../domain/matiere';
//
export class WorkViewModel extends BaseViewModel {
    //
    private _dep: IBaseItem;
    public departements: IBaseItem[];
    private _annee: IBaseItem;
    public _annees: IBaseItem[];
    private _unite: IBaseItem;
    public _unites: IBaseItem[];
    private _groupe: IBaseItem;
    public _groupes: IBaseItem[];
    private _semestre: IBaseItem;
    public _semestres: IBaseItem[];
    private _matiere: IBaseItem;
    public _matieres: IBaseItem[];
    //
    public unites: IBaseItem[];
    public groupes: IBaseItem[];
    public annees: IBaseItem[];
    public semestres: IBaseItem[];
    public matieres: IBaseItem[];
    //
    constructor() {
        super();
        this._dep = null;
        this.departements = [];
        this._annee = null;
        this._annees = [];
        this._unite = null;
        this._unites = [];
        this._groupe = null;
        this._groupes = [];
        this._semestre = null;
        this._semestres = [];
        this._matiere = null;
        this._matieres = [];
        this.unites = [];
        this.groupes = [];
        this.annees = [];
        this.semestres = [];
        this.matieres = [];
    }// constructor
    //
    public activate(): any {
        if (this.departements.length < 1) {
            return this.fill_departements();
        }
        return true;
    }// activate
    //
    protected fill_departements(): any {
        this.departements = [];
        this.annees = [];
        this.unites = [];
        this.groupes = [];
        this.semestres = [];
        this._matieres = [];
        this._annees = [];
        this._unites = [];
        this._semestres = [];
        this._matieres = [];
        this._groupes = [];
        this._dep = null;
        this._annee = null;
        this._semestre = null;
        this._unite = null;
        this._matiere = null;
        this._groupe = null;
        //
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if ((pPers === undefined) || (pPers === null)) {
            this.departements = [];
            this.departement = null;
            return true;
        }
        let name = this.userInfo.username;
        let bSuper = this.isSuper;
        let service = this.dataService;
        let self = this;
        let dep = new Departement();
        if (bSuper) {
            return service.get_all_items(dep).then((rr) => {
                self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                if (self.departements.length > 0) {
                    self.departement = self.departements[0];
                }
            });
        } else {
            let ids = ((pPers.departementids !== undefined) &&
                (pPers.departementids !== null) &&
                (pPers.departementids.length > 0)) ? pPers.departementids : [];
            if (ids.length < 1) {
                this.departements = [];
                this.departement = null;
                return true;
            } else {
                return service.find_items_array(ids).then((rr) => {
                    self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                    if ((pPers.anneeids !== undefined) && (pPers.anneeids !== null) &&
                        (pPers.anneeids.length > 0)) {
                        return service.find_items_array(pPers.anneeids);
                    } else {
                        return [];
                    }
                }).then((aa) => {
                    self._annees = aa;
                    if ((pPers.semestreids !== undefined) && (pPers.semestreids !== null) &&
                        (pPers.semestreids.length > 0)) {
                        return service.find_items_array(pPers.semestreids);
                    } else {
                        return [];
                    }
                }).then((ss) => {
                    self._semestres = ss;
                    if ((pPers.uniteids !== undefined) && (pPers.uniteids !== null) &&
                        (pPers.uniteids.length > 0)) {
                        return service.find_items_array(pPers.uniteids);
                    } else {
                        return [];
                    }
                }).then((uu) => {
                    self._unites = uu;
                    if ((pPers.matiereids !== undefined) && (pPers.matiereids !== null) &&
                        (pPers.matiereids.length > 0)) {
                        return service.find_items_array(pPers.matiereids);
                    } else {
                        return [];
                    }
                }).then((mm) => {
                    self._matieres = mm;
                    if ((pPers.groupeids !== undefined) && (pPers.groupeids !== null) &&
                        (pPers.groupeids.length > 0)) {
                        return service.find_items_array(pPers.groupeids);
                    } else {
                        return [];
                    }
                }).then((gg) => {
                    self._groupes = gg;
                    if (self.departements.length > 0) {
                        self.departement = self.departements[0];
                    }
                });
            }
        }
    }// fill_departements     
    //
    protected post_change_annee(): any {
        this.semestres = [];
        this.semestre = null;
        let id = this.anneeid;
        if (id === null) {
            return true;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Semestre({ departementid: this.departementid, uniteid: this.anneeid });
            return this.dataService.get_all_items(m).then((mm) => {
                self.semestres = mm;
                if (self.semestres.length > 0) {
                    self.semestre = self.semestres[0];
                }
            });
        } else {
            if ((this._semestres !== undefined) && (this._semestres !== null)) {
                for (let m of this._semestres) {
                    if (m.anneeid == id) {
                        this.semestres.push(m);
                    }
                }
            }
            if (this.semestres.length > 0) {
                this.semestre = this.semestres[0];
            }
            return true;
        }
    }
    protected post_change_groupe(): any {

    }
    protected post_change_semestre(): any {

    }
    protected post_change_matiere(): any {

    }
    protected post_change_unite(): any {
        this._matieres = [];
        this.matiere = null;
        let id = this.uniteid;
        if (id === null) {
            return true;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Matiere({ departementid: this.departementid, uniteid: this.uniteid });
            return this.dataService.get_all_items(m).then((mm) => {
                self.matieres = mm;
                if (self.matieres.length > 0) {
                    self.matiere = self.matieres[0];
                }
            });
        } else {
            if ((this._matieres !== undefined) && (this._matieres !== null)) {
                for (let m of this._matieres) {
                    if (m.uniteid == id) {
                        this.matieres.push(m);
                    }
                }
            }
            if (this.matieres.length > 0) {
                this.matiere = this.matieres[0];
            }
            return true;
        }
    }
    protected post_change_departement(): any {
        this.unites = [];
        this.groupes = [];
        this.annees = [];
        this.unite = null;
        this.groupe = null;
        this.annee = null;
        let depid = this.departementid;
        if (depid === null) {
            return true;
        }
        let self = this;
        let service = this.dataService;
        if (this.isSuper) {
            let m1 = new Annee({ departementid: depid });
            return service.get_items(m1).then((aa) => {
                self.annees = aa;
                let m2 = new Unite({ departementid: depid });
                return service.get_items(m2);
            }).then((uu) => {
                self.unites = uu;
                let m3 = new Groupe({ departementid: depid });
                return service.get_items(m3);
            }).then((gg) => {
                self.groupes = gg;
                if (self.annees.length > 0) {
                    self.annee = self.annees[0];
                }
                if (self.unites.length > 0) {
                    self.unite = self.unites[0];
                }
                if (self.groupes.length > 0) {
                    self.groupe = self.groupes[0];
                }
            });
        } else {
            if ((this._annees !== undefined) && (this._annees !== null)) {
                for (let m of this._annees) {
                    if (m.departementid == depid) {
                        this.annees.push(m);
                    }
                }
            }
            if (this.annees.length > 0) {
                this.annee = this.annees[0];
            }
            if ((this._unites !== undefined) && (this._unites !== null)) {
                for (let m of this._unites) {
                    if (m.departementid == depid) {
                        this.unites.push(m);
                    }
                }
            }
            if (this.unites.length > 0) {
                this.unite = this.unites[0];
            }
            if ((this._groupes !== undefined) && (this._groupes !== null)) {
                for (let m of this._groupes) {
                    if (m.departementid == depid) {
                        this.groupes.push(m);
                    }
                }
            }
            if (this.groupes.length > 0) {
                this.groupe = this.groupes[0];
            }
        }
    }// post_change_departement
    //
    public get departement(): IBaseItem {
        if (this._dep === null) {
            this._dep = new Departement();
        }
        return this._dep;
    }
    public set departement(s: IBaseItem) {
        this._dep = (s !== undefined) ? s : null;
        this.post_change_departement();
    }
    public get hasDepartements(): boolean {
        return ((this.departements !== null) && (this.departements !== null) &&
            (this.departements.length > 1));
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    public get groupe(): IBaseItem {
        if (this._groupe === null) {
            this._groupe = new Groupe();
        }
        return this._groupe;
    }
    public get unite(): IBaseItem {
        if (this._unite === null) {
            this._unite = new Unite();
        }
        return this._unite;
    }
    public set unite(s: IBaseItem) {
        this._unite = (s !== undefined) ? s : null;
        this.post_change_unite();
    }
    public get hasUnites(): boolean {
        return ((this.unites !== null) && (this.unites !== null) &&
            (this.unites.length > 1));
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    //
    public get annee(): IBaseItem {
        if (this._annee === null) {
            this._annee = new Annee();
        }
        return this._annee;
    }
    public set annee(s: IBaseItem) {
        this._annee = (s !== undefined) ? s : null;
        this.post_change_annee();
    }
    public get hasAnnee(): boolean {
        return ((this.annees !== null) && (this.annees !== null) &&
            (this.annees.length > 1));
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    //
    public set groupe(s: IBaseItem) {
        this._groupe = (s !== undefined) ? s : null;
        this.post_change_groupe();
    }
    public get hasGroupes(): boolean {
        return ((this.groupes !== null) && (this.groupes !== null) &&
            (this.groupes.length > 1));
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    public get matiere(): IBaseItem {
        if (this._matiere === null) {
            this._matiere = new Matiere();
        }
        return this._matiere;
    }
    public set matiere(s: IBaseItem) {
        this._matiere = (s !== undefined) ? s : null;
        this.post_change_matiere();
    }
    public get hasMatieres(): boolean {
        return ((this.matieres !== null) && (this.matieres !== null) &&
            (this.matieres.length > 1));
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
    }
    public get semestre(): IBaseItem {
        if (this._semestre === null) {
            this._semestre = new Semestre();
        }
        return this._semestre;
    }
    public set semestre(s: IBaseItem) {
        this._semestre = (s !== undefined) ? s : null;
        this.post_change_semestre();
    }
    public get hasSemestres(): boolean {
        return ((this.semestres !== null) && (this.semestres !== null) &&
            (this.semestres.length > 1));
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
}// class WorkViewModel