//etudaffectation.ts
//
import {IEtudAffectationItem} from '../../infodata.d';
import {AffectationItem} from './affectationitem';
//
export class EtudAffectation extends AffectationItem
    implements IEtudAffectationItem {
    public etudiantid: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.etudiantid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
    } // constructor
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
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
        return super.is_storeable() && (this.etudiantid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.etudiantid = this.etudiantid;
    } // toInsertMap
    public get base_prefix(): string {
        return 'ETF';
    }
    public set base_prefix(s: string) { }
    public get type(): string {
        return 'etudaffectation';
    }
    public set type(s: string) {

    }
    public get collection_name(): string {
        return 'etudaffectations';
    }
    public set collection_name(s: string) {

    }
}