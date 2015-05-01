//departementchild.ts
//
import {IDepartementChildItem} from '../../infodata.d';
import {BaseItem} from './baseitem';
//
export class DepartementChildItem extends BaseItem
    implements IDepartementChildItem {
    public departementid: string;
    constructor(oMap?: any) {
        super(oMap);
        this.departementid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.departementid !== null)) {
            s = s + '-' + this.departementid;
        }
        return s;
    }
    public set start_key(s: any) {
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.departementid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.departementid = this.departementid;
    } // toInsertMap
}