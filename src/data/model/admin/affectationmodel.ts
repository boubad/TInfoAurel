//affecttaionviewmodel.ts
//
import {IBaseItem, IPerson,IDepartementPerson,IAffectationItem} from '../../../infodata.d';
//
import {WorkViewModel} from '../workviewmodel';
//
export class AffectationViewModel extends WorkViewModel {
    private _affModel:IBaseItem;
    private _persModel:IDepartementPerson;
    //
    public personElements:IBaseItem[];
    public current_personElements:IBaseItem[];
    //
    public affectations: IBaseItem[];
    public current_affectation: IBaseItem;
    //
    protected _startDate: Date;
    protected _endDate: Date;
     public genre: string;
    //
    constructor(model:IAffectationItem,persModel:IDepartementPerson) {
        super();
        this._affModel = model;
        this._persModel = persModel;
        this.personElements = [];
        this.current_personElements = [];
        this.affectations = [];
        this.current_affectation = null;
        this._startDate = null;
        this._endDate = null;
        this.genre = null;
    }// constructor
    public get startDate(): string {
        return this.date_to_string(this._startDate);
        
    }
    public set startDate(s: string) {
        this._startDate = this.string_to_date(s);
    }
    public get endDate(): string {
        return this.date_to_string(this._endDate);
    }
    public set endDate(s: string) {
        this._endDate = this.string_to_date(s);
    }
    protected post_change_departement(): any {
        let self = this;
        let gen = this.generator;
        return super.post_change_departement().then((r)=>{
            self.personElements = [];
            self.current_personElements = [];
            self.affectations = [];
            self.current_affectation = null;
            self._startDate = null;
            self._endDate = null;
            let id = self.departementid;
            if (id === null) {
                return true;
            }
            let model = gen.create_item({departementid: id, type: self._persModel.type});
            self.dataService.get_all_items(model).then((pp) => {
                self.personElements = pp;
            });
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
        let gen = this.generator;
        let model = gen.create_item({
            type: this._affModel.type,
            departementid: this.departementid,
            anneeid: this.anneeid, 
            semestreid: semid,
            matiereid: matid,
            groupeid: grpid
            });
        let self = this;
        return this.dataService.get_all_items(model).then((aa) => {
            self.affectations = aa;
        });
    }// refreshAffecttaion
    protected post_change_groupe(): any {
        return this.refresh_affectations();
    }
    protected post_change_semestre(): any {
        this._startDate = null;
        this._endDate = null;
        let sem = this.semestre;
        if (sem !== null) {
            this._startDate = sem.startDate;
            this._endDate = sem.endDate;
        }
        return this.refresh_affectations();
    }
    protected post_change_matiere(): any {
        return this.refresh_affectations();
    }
    protected is_storeable(): boolean {
        let bRet = (this.current_personElements !== undefined) &&
            (this.current_personElements !== null) &&
            (this.current_personElements.length > 0) &&
            (this.departementid !== null) && (this.anneeid !== null) &&
            (this.semestreid !== null) && 
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
        }// is_storeable
    public get canSave(): boolean {
        return this.is_storeable();
    }// canSave
    protected  is_process(): boolean {
        return (this.personElements !== undefined) &&
            (this.personElements !== null) &&
            (this.personElements.length > 0) &&
            (this.departementid !== null) && (this.anneeid !== null) &&
            (this.semestreid !== null) && 
            (this.groupeid !== null);
    }// canProcess
    public get canProcess():boolean {
        return this.is_process();
    }
    public set canProcess(s:boolean){}
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
    protected create_affectation(prof: IDepartementPerson) : IAffectationItem {
        return null;
    }
    protected maintains_one_affectation(prof: any) : Promise<any> {
        let service = this.dataService;
        let self = this;
        let xPers:IPerson = null;
        return service.find_item_by_id(prof.personid).then((pPers:IPerson)=>{
                let item:IAffectationItem = self.create_affectation(prof);
                item.update_person(pPers);
                xPers = pPers;
                return service.maintains_item(item);
            }).then((r)=>{
                return service.maintains_item(xPers);
                });
        }// retrieve_affectation
    public save(): any {
        if (!this.canSave) {
            return false;
        }
        let self = this;
        this.clear_error();
        let pp: Promise<any>[] = [];
        for (let prof of this.current_personElements) {
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
}// class AffectationViewModel