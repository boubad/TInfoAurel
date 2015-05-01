//semestre.ts
//
import {ISemestre} from '../../infodata.d';
import { IntervalItem} from "./intervalitem";
//
export class Semestre extends IntervalItem implements ISemestre {
    public anneeid: string;
    constructor(oMap?: any) {
        super(oMap);
        this.anneeid = null;
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this.anneeid = oMap.anneeid;
            }
        } // oMap
    } // constructor
    public get base_prefix(): string {
        return 'SEM';
    }
    public set base_prefix(s: string) {

    }
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.anneeid !== null)) {
            s = s + '-' + this.anneeid;
        }
        return s;
    }
    public set start_key(s: any) {
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null);
    }
    public to_map(oMap?: any): void {
        super.to_map(oMap);
        oMap.anneeid = this.anneeid;
    } // to_insert_map
    public get type(): string {
        return 'semestre';
    }
    public set type(s: string) {

    }
    public get collection_name(): string {
        return 'semestres';
    }
    public set collection_name(s: string) {

    }
} // class Semestre