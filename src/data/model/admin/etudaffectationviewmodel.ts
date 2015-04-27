//etudaffecttaionviewmodel.ts
//
import {IDepartementPerson,IAffectationItem} from '../../../infodata.d';
//
import {AffectationViewModel} from './affectationmodel';
import {Etudiant} from '../../domain/etudiant';
import {EtudAffectation} from '../../domain/etudaffectation';
//
export class EtudAffectationViewModel extends AffectationViewModel {
    //
    constructor() {
        super(new EtudAffectation(),new Etudiant());
    }// constructor
    protected refresh_affectations(): any {
        this.affectations = [];
        this.current_affectation = null;
        let semid = this.semestreid;
        let grpid = this.groupeid;
        if ((semid === null) || (grpid === null)) {
            return true;
        }
        let model = new EtudAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: semid,
            groupeid: grpid
            });
        let self = this;
        return this.dataService.get_all_items(model).then((aa) => {
            self.affectations = aa;
        });
    }// refreshAffecttaion
    protected create_affectation(prof: IDepartementPerson) : IAffectationItem {
        return new EtudAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            etudiantid: prof.id,
            genre: this.genre,
            starDate: this._startDate,
            endDate:this._endDate,
            personid: prof.personid
            });
    }// create_affectation
}// class EtudAffectationViewModel
