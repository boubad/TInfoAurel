//intervalitem.ts
//
import {IIntervalItem} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
//
export class IntervalItem extends DepSigleNameItem implements IIntervalItem {
    private _start:Date;
    private _end:Date;
    constructor(oMap?:any) {
        super(oMap);
        this._start = null;
        this._end = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    } // constructor
    public get startDate():Date {
        return this._start;
    }
    public set startDate(d:Date){
        this._start = this.check_date(d);
    }
    public get endDate():Date {
        return this._end;
    }
    public set endDate(d:Date){
        this._end = this.check_date(d);
    }
    public create_id() : string {
         let d = (this.startDate !== null) ? this.startDate : new Date();
         let dd = new Date(Date.parse(d.toString()));
         let ss = dd.toISOString().substr(0,10);
         let s = this.base_prefix;
        if ((s !== null) && (this.departementid !== null)){
            s = s + '-' + this.departementid + '-' + ss;
        }
        return s;
    } // create_id
    public  is_storeable() :boolean {
        if ((!super.is_storeable()) || (this.startDate === null) || (this.endDate === null)){
            return false;
        }
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)){
            return false;
        }
        return (t1 <= t2);
    }
    public to_map(oMap:any) : void {
        super.to_map(oMap);
        oMap.startDate = this.startDate;
        oMap.endDate = this.endDate;
    } // toInsertMap
}