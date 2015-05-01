//annee.ts
//
import {IAnnee} from '../../infodata.d';
import { IntervalItem} from "./intervalitem";
//
export class Annee extends IntervalItem implements IAnnee {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor

    public get type(): string {
        return 'annee';
    }
    public set type(s: string) {

    }
    public get base_prefix(): string {
        return 'ANN';
    }
    public set base_prefix(s: string) {

    }
} // class Annee