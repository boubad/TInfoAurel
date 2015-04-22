//intervalitem.ts
//
import {IIntervalItem} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
//
export class IntervalItem extends DepSigleNameItem implements IIntervalItem {
    private _start: Date;
    private _end: Date;
    constructor(oMap?: any) {
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
    public get startDate(): Date {
        return this._start;
    }
    public set startDate(d: Date) {
        this._start = this.check_date(d);
    }
    public get endDate(): Date {
        return this._end;
    }
    public set endDate(d: Date) {
        this._end = this.check_date(d);
    }
    public get start_key(): string {
        return this.base_prefix + '-' + this.departementid;
    }
    public set start_key(s: string) {


    }
    public create_id(): string {
        let d = (this.startDate !== null) ? this.startDate : new Date();
        let dd = new Date(Date.parse(d.toString()));
        let ss = dd.toISOString().substr(0, 10);
        let s = this.base_prefix;
        if ((s !== null) && (this.departementid !== null)) {
            s = s + '-' + this.departementid + '-' + ss;
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.startDate === null) || (this.endDate === null)) {
            return false;
        }
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.startDate = this.startDate;
        oMap.endDate = this.endDate;
    } // toInsertMap
    public sort_func(p1:IIntervalItem, p2:IIntervalItem): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.startDate !== undefined) && (p1.startDate !== null)) {
                if ((p2.startDate !== undefined) && (p2.startDate !== null)) {
                    var s1 = Date.parse(p1.startDate.toString());
                    var s2 = Date.parse(p2.startDate.toString());
                    if (s1 < s2){
                      vRet = 1;
                    } else if (s1 > s2){
                      vRet = -1;
                    } else {
                      vRet = 0;
                    }
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