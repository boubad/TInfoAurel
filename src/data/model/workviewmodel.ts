//workviewmodel.ts
//
import {IBaseItem, IAnnee, IUnite, IGroupe, ISemestre, IMatiere} from '../../infodata.d';
import {DepViewModel} from './depviewmodel';
import {UserInfo} from './userinfo';
import {Departement} from '../domain/departement';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Semestre} from '../domain/semestre';
import {Matiere} from '../domain/matiere';
import {InfoRoot} from '../inforoot';
//
export class WorkViewModel extends DepViewModel {
    //
    private _annee: IAnnee;
    public _annees: IAnnee[];
    private _unite: IUnite;
    public _unites: IUnite[];
    private _groupe: IGroupe;
    public _groupes: IGroupe[];
    private _semestre: ISemestre;
    public _semestres: ISemestre[];
    private _matiere: IMatiere;
    public _matieres: IMatiere[];
    //
    public unites: IUnite[];
    public groupes: IGroupe[];
    public annees: IAnnee[];
    public semestres: ISemestre[];
    public matieres: IMatiere[];
    //
    protected _minDate: Date;
    protected _maxDate: Date;
    //
    constructor() {
        super();
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
        this._minDate = null;
        this._maxDate = null;
    }// constructor
    public activate(params?: any, queryString?: any, routeConfig?: any): any {
        let userinfo = this.userInfo;
        let id = userinfo.departementid;
        if (this.departements.length > 0) {
            let dep = InfoRoot.sync_array(this.departements, id);
            if (dep !== null) {
                let oMap: any = {};
                dep.to_map(oMap);
                this.departement = new Departement(oMap);
            } else {
                this.departement = null;
            }
            return Promise.resolve(true);
        }
        let pPers = userinfo.person;
        let self = this;
        this._departement = null;
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
        if ((pPers === undefined) || (pPers === null)) {
            return Promise.resolve(true);
        }
        let service = this.dataService;
        if (pPers.is_super) {
            return this.fill_departements().then((r) => {
                let dep = InfoRoot.sync_array(this.departements, id);
                if (dep !== null) {
                    let oMap: any = {};
                    dep.to_map(oMap);
                    this.departement = new Departement(oMap);
                } else {
                    this.departement = null;
                }
                return true;
            });
        }
        let vEmpty: IBaseItem[] = [];
        return this.fill_departements().then((r: IBaseItem[]) => {
            let ids = ((pPers.anneeids !== undefined) && (pPers.anneeids !== null)) ? pPers.anneeids : [];
            if (ids.length < 1) {
                return vEmpty;
            } else {
                return service.find_items_array(ids);
            }
        }).then((aa: IAnnee[]) => {
            self._annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
            let ids = ((pPers.semestreids !== undefined) && (pPers.semestreids !== null)) ? pPers.semestreids : [];
            if (ids.length < 1) {
                return vEmpty;
            } else {
                return service.find_items_array(ids);
            }
        }).then((ss: ISemestre[]) => {
            self._semestres = ((ss !== undefined) && (ss !== null)) ? ss : [];
            let ids = ((pPers.uniteids !== undefined) && (pPers.uniteids !== null)) ? pPers.uniteids : [];
            if (ids.length < 1) {
                return vEmpty;
            } else {
                return service.find_items_array(ids);
            }
        }).then((uu: IUnite[]) => {
            self._unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
            let ids = ((pPers.matiereids !== undefined) && (pPers.matiereids !== null)) ? pPers.matiereids : [];
            if (ids.length < 1) {
                return vEmpty;
            } else {
                return service.find_items_array(ids);
            }
        }).then((mm: IMatiere[]) => {
            self._matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
            let ids = ((pPers.groupeids !== undefined) && (pPers.groupeids !== null)) ? pPers.groupeids : [];
            if (ids.length < 1) {
                return vEmpty;
            } else {
                return service.find_items_array(ids);
            }
        }).then((gg: IGroupe[]) => {
            self._groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
            let dep = InfoRoot.sync_array(this.departements, id);
            if (dep !== null) {
                let oMap: any = {};
                dep.to_map(oMap);
                this.departement = new Departement(oMap);
            } else {
                this.departement = null;
            }
            return true;
        });
    }// activate
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
        let self = this;
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        let depid = this.departementid;
        let service = this.dataService;
        return super.post_change_departement().then((r) => {
            self.unites = [];
            self.groupes = [];
            self.annees = [];
            self.semestres = [];
            self.matieres = [];
            if (pPers.is_super) {
                if (depid === null) {
                    self._unite = null;
                    self._annee = null;
                    self._groupe = null;
                    return true;
                }
                let m1 = new Annee({ departementid: depid });
                service.get_all_items(m1).then((aa: IAnnee[]) => {
                    self.annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
                    let m2 = new Unite({ departementid: depid });
                    return service.get_all_items(m2);
                }).then((uu: IUnite[]) => {
                    self.unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
                    let m3 = new Groupe({ departementid: depid });
                    return service.get_all_items(m3);
                }).then((gg: IGroupe[]) => {
                    self.groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
                    let a = InfoRoot.sync_array(self.annees, userinfo.anneeid);
                    if (a !== null) {
                        let oMap: any = {};
                        a.to_map(oMap);
                        self.annee = new Annee(oMap);
                    } else {
                        self.annee = null;
                    }
                    let u = InfoRoot.sync_array(self.unites, userinfo.uniteid);
                    if (u !== null) {
                        let oMap: any = {};
                        u.to_map(oMap);
                        self.unite = new Unite(oMap);
                    } else {
                        self.unite = null;
                    }
                    let g = InfoRoot.sync_array(self.groupes, userinfo.groupeid);
                    if (g !== null) {
                        let oMap: any = {};
                        u.to_map(oMap);
                        self.groupe = new Groupe(oMap);
                    } else {
                        self.groupe = null;
                    }
                    return true;
                });
            }
            if ((self._annees !== undefined) && (self._annees !== null)) {
                for (let m of self._annees) {
                    if (m.departementid == depid) {
                        self.annees.push(m);
                    }
                }
            }
            if ((self._unites !== undefined) && (self._unites !== null)) {
                for (let m of self._unites) {
                    if (m.departementid == depid) {
                        self.unites.push(m);
                    }
                }
            }
            if ((self._groupes !== undefined) && (self._groupes !== null)) {
                for (let m of self._groupes) {
                    if (m.departementid == depid) {
                        self.groupes.push(m);
                    }
                }
            }
            let a = InfoRoot.sync_array(self.annees, userinfo.anneeid);
            if (a !== null) {
                let oMap: any = {};
                a.to_map(oMap);
                self.annee = new Annee(oMap);
            } else {
                self.annee = null;
            }
            let u = InfoRoot.sync_array(self.unites, userinfo.uniteid);
            if (u !== null) {
                let oMap: any = {};
                u.to_map(oMap);
                self.unite = new Unite(oMap);
            } else {
                self.unite = null;
            }
            let g = InfoRoot.sync_array(self.groupes, userinfo.groupeid);
            if (g !== null) {
                let oMap: any = {};
                u.to_map(oMap);
                self.groupe = new Groupe(oMap);
            } else {
                self.groupe = null;
            }
            return true;
        });

    }// post_change_departement
    //
    public get groupe(): IGroupe {
        if (this._groupe === null) {
            this._groupe = new Groupe({ departementid: this.departementid });
        }
        return this._groupe;
    }
    public set groupe(s: IGroupe) {
        this._groupe = ((s !== undefined) && (s !== null)) ? s : new Groupe({ departementid: this.departementid });
        this.userInfo.groupeid = this.groupeid;
        this.post_change_groupe();
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    public get hasGroupes(): boolean {
        return (this.groupes !== null) && (this.groupes !== null) &&
            (this.groupes.length > 0);
    }
    public get unite(): IUnite {
        if (this._unite === null) {
            this._unite = new Unite({ departementid: this.departementid });
        }
        return this._unite;
    }
    public set unite(s: IUnite) {
        this._unite = ((s !== undefined) && (s !== null)) ? s : new Unite({ departementid: this.departementid });
        this.matieres = [];
        let id = this.uniteid;
        this.userInfo.uniteid = id;
        let userinfo = this.userInfo;
        if (id === null) {
            this.post_change_unite();
            this.matiere = null;
            return;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Matiere({ departementid: this.departementid, uniteid: id });
            this.dataService.get_all_items(m).then((mm: IMatiere[]) => {
                self.matieres = mm;
                let mx = InfoRoot.sync_array(self.matieres, userinfo.matiereid);
                self.post_change_unite();
                if (mx !== null) {
                    let oMap: any = {};
                    mx.to_map(oMap);
                    self.matiere = new Matiere(oMap);
                } else {
                    self.matiere = null;
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
            let mx = InfoRoot.sync_array(this.matieres, userinfo.matiereid);
            this.post_change_unite();
            if (mx !== null) {
                let oMap: any = {};
                mx.to_map(oMap);
                this.matiere = new Matiere(oMap);
            } else {
                this.matiere = null;
            }
        }
    }
    public get hasUnites(): boolean {
        return (this.unites !== null) && (this.unites !== null) &&
            (this.unites.length > 1);
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    //
    public get annee(): IAnnee {
        if (this._annee === null) {
            this._annee = new Annee({ departementid: this.departementid });
        }
        return this._annee;
    }
    public set annee(s: IAnnee) {
        this._annee = ((s !== undefined) && (s !== null)) ? s : new Annee({ departementid: this.departementid });
        this.semestres = [];
        let id = this.anneeid;
        this.userInfo.anneeid = id;
        let userinfo = this.userInfo;
        if (id === null) {
            this.post_change_annee();
            this.semestre = null;
            return;
        }
        if (this.isSuper) {
            let self = this;
            let m = new Semestre({ departementid: this.departementid, anneeid: id });
            this.dataService.get_all_items(m).then((mm: ISemestre[]) => {
                self.semestres = mm;
                let mx = InfoRoot.sync_array(self.semestres, userinfo.semestreid);
                self.post_change_annee();
                if (mx !== null) {
                    let oMap: any = {};
                    mx.to_map(oMap);
                    self.semestre = new Semestre(oMap);
                } else {
                    self.semestre = null;
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
            let mx = InfoRoot.sync_array(this.semestres, userinfo.semestreid);
            this.post_change_annee();
            if (mx !== null) {
                let oMap: any = {};
                mx.to_map(oMap);
                this.semestre = new Semestre(oMap);
            } else {
                this.semestre = null;
            }
        }
    }
    public get hasAnnee(): boolean {
        return ((this.annees !== null) && (this.annees !== null) &&
            (this.annees.length > 0));
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    //
    public get matiere(): IMatiere {
        if (this._matiere === null) {
            this._matiere = new Matiere({ departementid: this.departementid, uniteid: this.uniteid });
        }
        return this._matiere;
    }
    public set matiere(s: IMatiere) {
        this._matiere = ((s !== undefined) && (s !== null)) ? s : new Matiere({ departementid: this.departementid, uniteid: this.uniteid });
        this.userInfo.matiereid = this.matiereid;
        this.post_change_matiere();
    }
    public get hasMatieres(): boolean {
        return ((this.matieres !== null) && (this.matieres !== null) &&
            (this.matieres.length > 0));
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
    }
    public get semestre(): ISemestre {
        if (this._semestre === null) {
            this._semestre = new Semestre({ departementid: this.departementid, anneid: this.anneeid });
        }
        return this._semestre;
    }
    public set semestre(s: ISemestre) {
        this._semestre = ((s !== undefined) && (s !== null)) ? s : new Semestre({ departementid: this.departementid, anneid: this.anneeid });
        this.userInfo.semestreid = this.semestreid;
        this._minDate = null;
        this._maxDate = null;
        let sem = this.semestre;
        if (sem !== null) {
            this._minDate = sem.startDate;
            this._maxDate = sem.endDate;
        }
        this.post_change_semestre();
    }
    public get hasSemestres(): boolean {
        return ((this.semestres !== null) && (this.semestres !== null) &&
            (this.semestres.length > 0));
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
    public get minDate(): string {
        return InfoRoot.date_to_string(this._minDate);
    }
    public set minDate(s: string) { }
    public get maxDate(): string {
        return InfoRoot.date_to_string(this._maxDate);
    }
    public set maxDate(s: string) {
    }
}// class WorkViewModel
