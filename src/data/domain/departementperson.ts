//departementperson.ts
//
import {IPerson, IDepartementPerson} from '../../infodata.d';
import {DepartementChildItem} from './departementchild';
import {InfoRoot} from '../inforoot';
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
        let s = this.start_key;
        if ((s !== null) && (this.lastname !== null)) {
            let s1 = InfoRoot.check_name(this.lastname);
            if (s1 !== null) {
                s = s + '-' + s1;
            }
        }
        if ((s !== null) && (this.firstname !== null)) {
            let s2 = InfoRoot.check_name(this.firstname);
            if (s2 !== null) {
                s = s + '-' + s2;
            }
        }
        if (s !== null) {
            s = s + '-' + InfoRoot.create_random_id();
        }
        return s;
    } // create_id
    public update_person(pPers: IPerson): void {
        if ((this.id === null) && this.is_storeable()) {
            this.id = this.create_id();
        }
        if ((pPers !== undefined) && (pPers !== null)) {
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            this.avatardocid = pPers.id;
            if (this.departementid !== null) {
                let cont: string[] = pPers.departementids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.departementid);
                pPers.departementids = cont;
            }
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null);
    }
    public toString(): string {
        return this.fullname;
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
    } // toInsertMap
    public sort_func(p1: IDepartementPerson, p2: IDepartementPerson): number {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.fullname !== undefined) && (p1.fullname !== null)) {
                if ((p2.fullname !== undefined) && (p2.fullname !== null)) {
                    let s1 = p1.fullname;
                    let s2 = p2.fullname;
                    vRet = s1.localeCompare(s2);
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