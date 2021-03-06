//profaffecttaionviewmodel.ts
//
import {IDepartementPerson,IAffectationItem} from '../../../infodata.d';
//
import {AffectationViewModel} from './affectationmodel';
import {Enseignant} from '../../domain/enseignant';
import {ProfAffectation} from '../../domain/profaffectation';
//
export class ProfAffectationViewModel extends AffectationViewModel {
    //
    constructor() {
        super(new ProfAffectation(),new Enseignant());
    }// constructor
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null) &&
            (this.matiereid !== null);
        }// is_storeable
    protected  is_process(): boolean {
        return super.is_process() && (this.uniteid !== null) && (this.matiereid !== null);
    }// canProcess
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
            anneeid: this.anneeid, 
            semestreid: semid,
            uniteid: this.uniteid,
            matiereid: matid,
            groupeid: grpid
            });
        let self = this;
        return this.dataService.get_all_items(model).then((aa) => {
            self.affectations = aa;
        });
    }// refreshAffecttaion
    protected create_affectation(prof: IDepartementPerson) : IAffectationItem {
        return new ProfAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            groupeid: this.groupeid,
            enseignantid: prof.id,
            genre: this.genre,
            starDate: this._startDate,
            endDate:this._endDate,
            personid: prof.personid
            });
    }// create_affectation
}// class ProfAffectationViewModel