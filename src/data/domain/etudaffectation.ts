//etudaffectation.ts
//
import {IPerson, IEtudAffectationItem} from '../../infodata.d';
import {AffectationItem} from './affectationitem';
import {InfoRoot} from '../inforoot';
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
    public create_id(): string {
        let s = this.start_key;
        if ((s !== null) && (this.lastname !== null)) {
            let s1 = InfoRoot.check_name(this.lastname);
            if (s1 !== null) {
                s = s + '-' + s1;
            }
        }
        if ((s !== null) && (this.firstname !== null)) {
            let s1 = InfoRoot.check_name(this.firstname);
            if (s1 !== null) {
                s = s + '-' + s1;
            }
        }
        if (s !== null) {
            s = s + '-' + InfoRoot.create_random_id();
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
}