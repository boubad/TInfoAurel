//siglenameitem.ts
//
import {ISigleNameItem} from '../../infodata.d';
import {BaseItem} from './baseitem';
//
export class SigleNameItem extends BaseItem implements ISigleNameItem {
	public sigle:string;
	public name:string;
	constructor(oMap?:any) {
        super(oMap);
        this.sigle = null;
        this.name = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this.sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
        } // oMap
    } // constructor
    public create_id() : string {
        let ss = this.sigle;
        if (ss === null) {
            return super.create_id();
        }
        ss = ss.toUpperCase();
        let s = this.base_prefix;
        if (s !== null) {
            s = s + "-" + ss;
        } else {
            s = ss;
        }
        return s;
    } // create_id
    public  is_storeable() :boolean {
        return super.is_storeable() && (this.sigle !== null);
    }
    public to_map(oMap:any) : void {
        super.to_map(oMap);
        oMap.sigle = this.sigle;
        oMap.name = this.name;
    } // toInsertMap
   public  toString(): string{
        let sRet = this.name;
        if (sRet === null){
            sRet = this.sigle;
        }
       return sRet;
    } // toString
   public  sort_func(p1:ISigleNameItem, p2:ISigleNameItem): number {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.sigle !== undefined) && (p1.sigle !== null)) {
                if ((p2.sigle !== undefined) && (p2.sigle !== null)) {
                    let s1 = p1.sigle;
                    let s2 = p2.sigle;
                    vRet = s1.localeCompare(s2);
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
}