//etudevent.ts
//
import {IEtudEvent, IPerson} from '../../infodata.d';
import {WorkItem} from './workitem';
//
export class EtudEvent extends WorkItem
    implements IEtudEvent {
    public groupeeventid:string;
    public etudiantid:string;
    public etudaffectationid:string;
    private _note:number;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.groupeeventid = null;
        this.etudiantid = null;
        this.etudaffectationid = null;
        this._note = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined){
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.etudiantid !== undefined){
                this.etudiantid = oMap.etudiantid;
            }
            if (oMap.etudaffectationid !== undefined){
                this.etudaffectationid = oMap.etudaffectationid; 
            }
            if (oMap.note !== undefined){
                this.note = oMap.note;
            }
        } // oMap
    } // constructor
    public get note():number {
        return this._note;
    }
    public set note(s:number){
        let d = this.check_number(s);
        if ((d !== null) && (d >= 0)){
            this._note = d;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.groupeeventid = this.groupeeventid;
        oMap.etudiantid = this.etudiantid;
        oMap.etudaffectationid = this.etudaffectationid;
        oMap.note = this.note;
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont = pPers.eventids;
            this.add_id_to_array(cont, this.id);
            pPers.eventids = ((cont !== undefined) && (cont !== null)) ? cont : [];
        }// pPers
    }// update_person
    public toString():string {
        let s = this.lastname;
        if ((s !== null) && (this.firstname !== null)){
            s = s + ' ' + this.firstname;
        }
        return s;
    }
    public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.groupeeventid !== null) &&
            (this.etudiantid !== null);
            return bRet;
    }
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + '-' + this.groupeeventid;
        }
        return s;
    }
    public set start_key(s: any) {
    }
    public create_id(): string {
        let s = this.start_key;
        if ((s !== null) && (this.lastname !== null)){
            s = s + '-' + this.lastname.toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.toUpperCase();
        }
        return s;
    } // create_id
    public get type():string {
        return 'etudevent';
    }
    public set type(s:string){
    }
    public get collection_name():string {
        return 'etudevents';
    }
    public set collection_name(s:string){
    }
    public get base_prefix():string {
        return 'EVT';
    }
    public set base_prefix(s:string){
    }
}// class EtudEvent