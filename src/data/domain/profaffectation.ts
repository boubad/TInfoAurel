//departementperson.ts
//
import {IProfAffectationItem, IPerson} from '../../infodata.d';
import {AffectationItem} from './affectationitem';
import {InfoRoot} from '../inforoot';
//
export class ProfAffectation extends AffectationItem
    implements IProfAffectationItem {
    public enseignantid: string;
    public uniteid: string;
    public matiereid: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.enseignantid = null;
        this.uniteid = null;
        this.matiereid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantid !== undefined) {
                this.enseignantid = oMap.enseignantid;
            }
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
        } // oMap
    } // constructor
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.uniteid !== null) {
                let cont: string[] = pPers.uniteids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.uniteid);
                pPers.uniteids = cont;
            }
            if (this.matiereid !== null) {
                let cont: string[] = pPers.matiereids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.matiereid);
                pPers.matiereids = cont;
            }
        }// pPers
    }// update_person
    public get start_key(): string {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre;
        }
        return s;
    }
    public set start_key(s: string) { }
    public create_id(): string {
        let s = this.start_key;
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            let ss = InfoRoot.create_date_random_id(this.startDate);
            if (ss !== null) {
                s = s + '-' + ss;
            }
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.enseignantid !== null) &&
            (this.uniteid !== null) && (this.matiereid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.enseignantid !== null) {
            oMap.enseignantid = this.enseignantid;
        }
        if (this.uniteid !== null) {
            oMap.uniteid = this.uniteid;
        }
        if (this.matiereid !== null) {
            oMap.matiereid = this.matiereid;
        }
    } // toInsertMap
    public get base_prefix(): string {
        return 'AFP';
    }
    public set base_prefix(s: string) { }
    public get type(): string {
        return 'profaffectation';
    }
    public set type(s: string) {

    }
}