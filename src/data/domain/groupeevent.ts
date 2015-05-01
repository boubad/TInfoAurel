//groupeevent.ts
//
import {IGroupeEvent, IPerson} from '../../infodata.d';
import {WorkItem} from './workitem';
import {InfoRoot} from '../inforoot';
//
export class GroupeEvent extends WorkItem
    implements IGroupeEvent {
    public profaffectationid: string;
    public enseignantid: string;
    public uniteid: string;
    public matiereid: string;
    public _name: string;
    public location: string;
    public _t1: Date;
    public _t2: Date;
    public _coef: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.profaffectationid = null;
        this.enseignantid = null;
        this.uniteid = null;
        this.matiereid = null;
        this.name = null;
        this.location = null;
        this._t1 = null;
        this._t2 = null;
        this._coef = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this.profaffectationid = oMap.profaffectationid;
            }
            if (oMap.enseignantid !== undefined) {
                this.enseignantid = oMap.enseignantid;
            }
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this.location = oMap.location;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
        } // oMap
    } // constructor
    public get name(): string {
        return this._name;
    }
    public set name(s: string) {
        this._name = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
        s.trim() : null;
    }
    public get startTime(): Date {
        return this._t1;
    }
    public set startTime(d: Date) {
        this._t1 = InfoRoot.check_date(d);
    }
    public get endTime(): Date {
        return this._t2;
    }
    public set endTime(d: Date) {
        this._t2 = InfoRoot.check_date(d);
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(s: number) {
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d > 0)) {
            this._coef = d;
        } else {
            this._coef = null;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.profaffectationid = this.profaffectationid;
        oMap.enseignantid = this.enseignantid;
        oMap.uniteid = this.uniteid;
        oMap.matiereid = this.matiereid;
        oMap.name = this.name;
        if (this.location !== null) {
            oMap.location = this.location;
        }
        if (this.coefficient !== null) {
            oMap.coefficient = this.coefficient;
        }
        if (this.startTime !== null) {
            oMap.startTime = this.startTime;
        }
        if (this.endTime !== null) {
            oMap.endTime = this.endTime;
        }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont: string[] = pPers.eventids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.eventids = cont;
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.profaffectationid !== null) &&
            (this.enseignantid !== null) && (this.uniteid !== null) &&
            (this.matiereid !== null) && (this.eventDate !== null) &&
            (this.name !== null) && (this.genre !== null);
        if (!bRet) {
            return false;
        }
        if ((this.startTime === null) || (this.endTime === null)) {
            return true;
        }
        let t1 = Date.parse(this.startTime.toString());
        let t2 = Date.parse(this.endTime.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public sort_func(p1: IGroupeEvent, p2: IGroupeEvent): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.eventDate !== undefined) && (p1.eventDate !== null)) {
                if ((p2.eventDate !== undefined) && (p2.eventDate !== null)) {
                    var s1 = Date.parse(p1.eventDate.toString());
                    var s2 = Date.parse(p2.eventDate.toString());
                    if (s1 < s2) {
                        vRet = 1;
                    } else if (s1 > s2) {
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
    public toString(): string {
        return this.name;
    }

    public get start_key(): string {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        return s;
    }
    public set start_key(s: string) { }
    public create_id(): string {
        let s = this.start_key;
        if ((s !== null) && (this.eventDate !== null)) {
            let ss = InfoRoot.create_date_random_id(this.eventDate);
            if (ss !== null) {
                s = s + '-' + ss;
            }
        }
        return s;
    } // create_id
    public get type(): string {
        return 'groupeevent';
    }
    public set type(s: string) {
    }
    public get base_prefix(): string {
        return 'GVT';
    }
    public set base_prefix(s: string) {
    }
}// class GroupeEvent