//profaffecttaionviewmodel.ts
//
import {IBaseItem, IPerson} from '../../../infodata.d';
//
import {WorkViewModel} from '../workviewmodel';
import {Enseignant} from '../../domain/enseignant';
import {ProfAffectation} from '../../domain/profaffectation';
//
export class ProfAffectationViewModel extends WorkViewModel {
    //
    public enseignants: IBaseItem[];
    public current_enseignants: IBaseItem[];
    public affectations: IBaseItem[];
    public current_affectation: IBaseItem;
    public genre: string;
    //
    private _startDate: Date;
    private _endDate: Date;
    private _minDate: Date;
    private _maxDate: Date;
    //
    constructor() {
        super();
        this.enseignants = [];
        this.current_enseignants = [];
        this.affectations = [];
        this.current_affectation = null;
        this.genre = null;
        this._startDate = null;
        this._endDate = null;
        this._minDate = null;
        this._maxDate = null;
    }// constructor
    public get startDate(): string {
        return this.date_to_string(this._startDate);
    }
    public set startDate(s: string) {
        this._startDate = this.string_to_date(s);
    }
    public get endDate(): string {
        return this.date_to_string(this._startDate);
    }
    public set endDate(s: string) {
        this._startDate = this.string_to_date(s);
    }
    protected post_change_departement(): any {
        super.post_change_departement();
        this.enseignants = [];
        this.current_enseignants = [];
        let id = this.departementid;
        if (id === null) {
            return;
        }
        let self = this;
        let model = new Enseignant({ departementid: id });
        this.dataService.get_all_items(model).then((pp) => {
            self.enseignants = pp;
        });
    }// post_change_departement
    protected refresh_affectations(): any {
        this.affectations = [];
        this.current_affectation = null;
        let semid = this.semestreid;
        let matid = this.matiereid;
        let grpid = this.groupeid;
        if ((semid === null) || (matid === null) || (grpid === null)) {
            return true;
        }
        let model = new ProfAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid, semestreid: semid,
            matiereid: matid, groupeid: grpid
        });
        let self = this;
        return this.dataService.get_all_items(model).then((aa) => {
            self.affectations = aa;
        });
    }// refreshAffecttaion
    protected post_change_groupe(): any {
        super.post_change_groupe();
        return this.refresh_affectations();
    }
    protected post_change_semestre(): any {
        super.post_change_semestre();
        this._startDate = null;
        this._endDate = null;
        this._minDate = null;
        this._maxDate = null;
        let sem = this.semestre;
        if (sem !== null) {
            this._minDate = sem.startDate;
            this._maxDate = sem.endDate;
            this._startDate = sem.startDate;
            this._endDate = sem.endDate;
        }
        return this.refresh_affectations();
    }
    protected post_change_matiere(): any {
        super.post_change_matiere();
        return this.refresh_affectations();
    }
    public get canSave(): boolean {
        let bRet = (this.current_enseignants !== undefined) &&
            (this.current_enseignants !== null) &&
            (this.current_enseignants.length > 0) &&
            (this.departementid !== null) && (this.anneeid !== null) &&
            (this.uniteid !== null) && (this.matiereid !== null) &&
            (this.groupeid !== null) && (this._startDate !== null) &&
            (this._endDate !== null);
        if (!bRet) {
            return false;
        }
        let t1 = Date.parse(this._startDate.toString());
        let t2 = Date.parse(this._endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }// canSave
    public set canSave(s: boolean) { }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    public set cannotSave(s: boolean) { }
    public get canRemove(): boolean {
        return (this.current_affectation !== undefined) &&
            (this.current_affectation !== null);
    }
    public set canRemove(s: boolean) { }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public set cannotRemove(s: boolean) { }
    protected maintains_one_affectation(prof: IBaseItem): Promise<any> {
        let depid = this.departementid;
        let anid = this.anneeid;
        let semid = this.semestreid;
        let unid = this.uniteid;
        let grpid = this.groupeid;
        let matid = this.matiereid;
        let start = this._startDate;
        let end = this._endDate;
        let genre = this.genre;
        let self = this;
        let service = this.dataService;
        let personid = prof.personid;
        let xPers: IPerson = null;
        return service.find_item_by_id(personid).then((pPers: IPerson) => {
            xPers = pPers;
            let item = new ProfAffectation({
                departementid: depid,
                anneeid: anid,
                semestreid: semid,
                uniteid: unid,
                matiereid: matid,
                groupeid: grpid,
                enseignantid: prof.id,
                startDate: start,
                endDate: end,
                genre: genre
            });
            item.update_person(xPers);
            return service.maintains_item(item);
        }).then((r) => {
            return service.maintains_item(xPers);
        });
    }// maintains_one_item
    public save(): any {
        if (!this.canSave) {
            return false;
        }
        let self = this;
        this.clear_error();
        let pp: Promise<any>[] = [];
        for (let prof of this.current_enseignants) {
            let p = this.maintains_one_affectation(prof);
            pp.push(p);
        }// prof
        return Promise.all(pp).then((r) => {
            self.refresh_affectations();
        }, (err) => {
                self.set_error(err);
            });
    }// save
    public remove(): any {
        let item = this.current_affectation;
        if (item === null) {
            return false;
        }
        if (item.id === null) {
            return false;
        }
        if (this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            let self = this;
            return this.dataService.remove_item(item).then((r) => {
                self.refresh_affectations();
            }, (err) => {
                    self.set_error(err);
                });
        }
    }// remove
}// class ProfAffectationViewModel