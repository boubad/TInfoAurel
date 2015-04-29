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
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont = pPers.affectationids;
            this.add_id_to_array(cont, this.id);
            pPers.affectationids = ((cont !== undefined) && (cont !== null)) ? cont : [];
        }// pPers
    }// update_person
     public sort_func(p1:IAffectationItem, p2:IAffectationItem): number {
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