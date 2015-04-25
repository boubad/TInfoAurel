//departementperson.ts
//
import {IProfAffectationItem, IPerson} from '../../infodata.d';
import {AffectationItem} from './affectationitem';
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
                let cont = pPers.uniteids;
                this.add_id_to_array(cont, this.uniteid);
                pPers.uniteids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
            if (this.matiereid !== null) {
                let cont = pPers.matiereids;
                this.add_id_to_array(cont, this.matiereid);
                pPers.matiereids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
        }// pPers
    }// update_person
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        return s;
    }
    public set start_key(s: any) {

    }
    public create_id(): string {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre;
        }
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            let ss = this.startDate.toISOString().substr(0, 10);
            s = s + '-' + ss;
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.enseignantid !== null) &&
            (this.uniteid !== null) && (this.matiereid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.enseignantid = this.enseignantid;
        oMap.uniteid = this.uniteid;
        oMap.matiereid = this.matiereid;
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
    public get collection_name(): string {
        return 'profaffectations';
    }
    public set collection_name(s: string) {

    }
}