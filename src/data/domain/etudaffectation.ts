//etudaffectation.ts
//
import {IPerson, IEtudAffectationItem} from '../../infodata.d';
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
        let s = this.start_key;
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.toUpperCase();
        }
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        if (s !== null)  {
            s = s + '-' + sn;
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
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.etudiantid !== null) {
                let cont = pPers.etudiantids;
                this.add_id_to_array(cont, this.etudiantid);
                pPers.etudiantids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
        }// pPers
    }// update_person
}