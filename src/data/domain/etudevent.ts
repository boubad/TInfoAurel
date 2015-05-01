//etudevent.ts
//
import {IEtudEvent, IPerson} from '../../infodata.d';
import {WorkItem} from './workitem';
import {InfoRoot} from '../inforoot';
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
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d >= 0)){
            this._note = d;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.groupeeventid = this.groupeeventid;
        oMap.etudiantid = this.etudiantid;
        oMap.etudaffectationid = this.etudaffectationid;
        if (this.note !== null){
        oMap.note = this.note;
    }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont:string[] = pPers.eventids;
            if (cont === null){
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.eventids = cont;
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
            (this.etudiantid !== null) && (this.etudaffectationid !== null) &&
            (this.genre !== null);
    }
    public get start_key(): string {
        let s = this.base_prefix;
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + '-' + this.groupeeventid;
        }
        return s;
    }
    public set start_key(s: string) {
    }
    public create_id(): string {
        let s = this.start_key;
        if ((s !== null) && (this.lastname !== null)){
            let s1 = InfoRoot.check_name(this.lastname);
            if (s1 !== null){
                s = s + '-' + s1;
            }
        }
        if ((s !== null) && (this.firstname !== null)){
            let s1 = InfoRoot.check_name(this.firstname);
            if (s1 !== null){
                s = s + '-' + s1;
            }
        }
        if (s !== null){
            s = s + '-' + InfoRoot.create_random_id();
        }
        return s;
    } // create_id
    public get type():string {
        return 'etudevent';
    }
    public set type(s:string){
    }
    public get base_prefix():string {
        return 'EVT';
    }
    public set base_prefix(s:string){
    }
}// class EtudEvent