//departement.ts
//
import {IDepartement} from '../../infodata.d';
import {SigleNameItem} from "./siglenameitem";
//
export class Departement extends SigleNameItem implements IDepartement {
    constructor(oMap?: any) {
        super(oMap);
    }
    public get type(): string {
        return 'departement';
    }
    public set type(s: string) {
    }
    public get base_prefix(): string {
        return 'DEP';
    }
    public set base_prefix(s: string) {
    }
}// class IDepartement
