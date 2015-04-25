//affectationitem.ts
//
import {IAffectationItem, IPerson} from '../../infodata.d';
import {WorkItem} from './workitem';
//
export class AffectationItem extends WorkItem
    implements IAffectationItem {
    private _start: Date;
    private _end: Date;
    //
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
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.startDate = this.startDate;
        oMap.endDate = this.endDate;
    } // toInsertMap
}