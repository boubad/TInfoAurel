//departementperson.ts
//
import {IPerson, IDepartementPerson} from '../../infodata.d';
import {DepartementChildItem} from './departementchild';
//
export class DepartementPerson extends DepartementChildItem
    implements IDepartementPerson {
    public firstname: string;
    public lastname: string;
    constructor(oMap?: any) {
        super(oMap);
        this.firstname = null;
        this.lastname = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        } // oMap
    } // constructor
    public get personid(): string {
        return this.avatardocid;
    }
    public set personid(s: string) {
        this.avatardocid = s;
    }
    //
    public get fullname(): string {
        var s = '';
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname != null) {
            s = s + ' ' + this.firstname;
        }
        s = s.trim();
        return (s.length > 0) ? s : null;
    } // fullname
    public create_id(): string {
        let s = this.base_prefix;
        if ((s !== null) && (this.departementid !== null)) {
            s = s + '-' + this.departementid;
        }
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.toUpperCase();
        }
        return s;
    } // create_id
    public update_person(pPers: IPerson): void {
        if (this.id === null){
            this.id = this.create_id();
        }
        if ((pPers !== undefined) && (pPers !== null)) {
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            this.avatardocid = pPers.id;
            if (this.departementid !== null) {
                let cont = pPers.departementids;
                this.add_id_to_array(cont, this.departementid);
                pPers.departementids = ((cont !== undefined) && (cont !== null)) ? cont : [];
            }
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
    }
    public toString(): string {
        return this.fullname;
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.lastname = this.lastname;
        oMap.firstname = this.firstname;
    } // toInsertMap
}