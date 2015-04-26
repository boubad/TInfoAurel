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
    protected sync_departements(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.departementid;
        let cont = this.departements;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.departement = pSel;
    }// sync_departements
    protected sync_annees(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.anneeid;
        let cont = this.annees;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.annee = pSel;
    }// sync_annees
    protected sync_semestres(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.semestreid;
        let cont = this.semestres;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.semestre = pSel;
    }// sync_semestres
    protected sync_unites(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.uniteid;
        let cont = this.unites;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.unite = pSel;
    }// sync_unites
    protected sync_matieres(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.matiereid;
        let cont = this.matieres;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.matiere = pSel;
    }// sync_matieres
    protected sync_groupes(): void {
        let userinfo = this.userInfo;
        let pSel: IBaseItem = null;
        let id = userinfo.departementid;
        let cont = this.groupes;
        if (cont.length > 0) {
            if (id !== null) {
                for (let px of cont) {
                    if (px.id == id) {
                        pSel = px;
                        break;
                    }
                }// px
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        this.groupe = pSel;
    }// sync_groupes
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
        let depid = userinfo.departementid;
        let dep = new Departement();
        if (bSuper) {
            return service.get_all_items(dep).then((rr) => {
                self.departements = ((rr !== undefined) && (rr !== null)) ? rr : [];
                self.sync_departements();
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
                    self.sync_departements();
                });
            }
        }
    }// fill_departements
    //
    protected post_change_annee(): any {
        
    }
    protected post_change_groupe(): any {

    }
    protected post_change_semestre(): any {

    }
    protected post_change_matiere(): any {

    }
    protected post_change_unite(): any {

    }
    protected post_change_departement(): any {
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
        this.unites = [];
        this.groupes = [];
        this.annees = [];
        this.semestres = [];
        this.matieres = [];
        let depid = (this._dep !== null) ? this._dep.id : null;
        if (depid === null) {
            this.post_change_departement();
            this.sync_annees();
            this.sync_unites();
            this.sync_groupes();
            return;
        }
        let self = this;
        let service = this.dataService;
        if (this.isSuper) {
            let m1 = new Annee({ departementid: depid });
            service.get_items(m1).then((aa) => {
                self.annees = aa;
                let m2 = new Unite({ departementid: depid });
                return service.get_items(m2);
            }).then((uu) => {
                self.unites = uu;
                let m3 = new Groupe({ departementid: depid });
                return service.get_items(m3);
            }).then((gg) => {
                self.groupes = gg;
                self.sync_annees();
                self.sync_unites();
                self.sync_groupes();
            });
        } else {
            if ((this._annees !== undefined) && (this._annees !== null)) {
                for (let m of this._annees) {
                    if (m.departementid == depid) {
                        this.annees.push(m);
                    }
                }
            }
            if ((this._unites !== undefined) && (this._unites !== null)) {
                for (let m of this._unites) {
                    if (m.departementid == depid) {
                        this.unites.push(m);
                    }
                }
            }
            if ((this._groupes !== undefined) && (this._groupes !== null)) {
                for (let m of this._groupes) {
                    if (m.departementid == depid) {
                        this.groupes.push(m);
                    }
                }
            }
            this.post_change_departement();
            this.sync_annees();
            this.sync_unites();
            this.sync_groupes();
        }
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
        this.matieres = [];
        let id = this.uniteid;
        if (id === null) {
            this.post_change_unite();
            this.sync_matieres();
            return;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Matiere({ departementid: this.departementid, uniteid: id });
            this.dataService.get_all_items(m).then((mm) => {
                self.matieres = mm;
                self.sync_matieres();
            });
        } else {
            if ((this._matieres !== undefined) && (this._matieres !== null)) {
                for (let m of this._matieres) {
                    if (m.uniteid == id) {
                        this.matieres.push(m);
                    }
                }
            }
            this.post_change_unite();
            this.sync_matieres();
        }
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
        this.semestres = [];
        let id = this.anneeid;
        if (id === null) {
            this.post_change_annee();
            this.sync_semestres();
            return;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Semestre({ departementid: this.departementid, uniteid: this.anneeid });
            this.dataService.get_all_items(m).then((mm) => {
                self.semestres = mm;
                self.sync_semestres();
            });
        } else {
            if ((this._semestres !== undefined) && (this._semestres !== null)) {
                for (let m of this._semestres) {
                    if (m.anneeid == id) {
                        this.semestres.push(m);
                    }
                }
            }
            this.post_change_annee();
            this.sync_semestres();
        }
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
