//departementperson.ts
//
import {IWorkItem, IPerson} from '../../infodata.d';
import {DepartementPerson} from './departementperson';
//
export class WorkItem extends DepartementPerson
    implements IWorkItem {
    public anneeid: string;
    public semestreid: string;
    public groupeid: string;
    private _date: Date;
    public status: string;
    public genre: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.anneeid = null;
        this.semestreid = null;
        this.groupeid = null;
        this._date = null;
        this.status = null;
        this.genre = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this.eventDate= oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this.status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
        } // oMap
    } // constructor
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.anneeid !== null) {
                let cont = pPers.anneeids;
                this.add_id_to_array(cont, this.anneeid);
                pPers.anneeids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
            if (this.semestreid !== null) {
                let cont = pPers.semestreids;
                this.add_id_to_array(cont, this.semestreid);
                pPers.semestreids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
            if (this.groupeid !== null) {
                let cont = pPers.groupeids;
                this.add_id_to_array(cont, this.groupeid);
                pPers.groupeids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
        }// pPers
    }// update_person
    public get eventDate(): Date {
        return this._date;
    }
    public set eventDate(d: Date) {
        this._date = this.check_date(d);
    }
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        return s;
    }
    public set start_key(s: any) {

    }

    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.anneeid = this.anneeid;
        oMap.semestreid = this.semestreid;
        oMap.groupeid = this.groupeid;
        oMap.eventDate = this.eventDate;
        oMap.status = this.status;
        oMap.genre = this.genre;
    } // toInsertMap
}