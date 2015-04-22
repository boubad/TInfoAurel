//depsiglenameitem.ts
//
import {IDepSigleNameItem} from '../../infodata.d';
import {SigleNameItem} from './siglenameitem';
//
export class DepSigleNameItem extends SigleNameItem implements IDepSigleNameItem {
    public departementid:string;
    constructor(oMap?:any) {
        super(oMap);
        this.departementid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public create_id() : string {
        let s = this.base_prefix;
        if ((s !== null) && (this.departementid !== null)){
            s = s + '-' + this.departementid;
        }
        if ((s !== null) && (this.sigle !== null)){
            s = s + '-' + this.sigle.toUpperCase();
        }
        return s;
    } // create_id
    public get start_key():any{
         return this.base_prefix + '-' + this.departementid;
    }
    public set start_key(s:any) {
    }
    public  is_storeable() :boolean {
        return super.is_storeable() && (this.departementid !== null);
    }
    public to_map(oMap:any) : void {
        super.to_map(oMap);
        oMap.departementid = this.departementid;
    } // toInsertMap
}