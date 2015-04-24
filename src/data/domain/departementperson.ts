//departementperson.ts
//
import {IDepartementPerson} from '../../infodata.d';
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
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.lastname = this.lastname;
        oMap.firstname = this.firstname;
    } // toInsertMap
}