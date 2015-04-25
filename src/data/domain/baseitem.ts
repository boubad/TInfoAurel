//baseitem.ts
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {IBaseItem} from '../../infodata.d';
//
export class BaseItem implements IBaseItem {
    public id: string;
    public rev: string;
    public attachments: any;
    public avatarid: string;
    public avatardocid: string;
    public description: string;
    public url: string;
    //
    constructor(oMap?: any) {
        this.id = null;
        this.rev = null;
        this.attachments = null;
        this.avatarid = null;
        this.avatardocid = null;
        this.description = null;
        this.url = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
            if (oMap._attachments !== undefined) {
                this.attachments = oMap._attachments;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description
            }
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
            if (oMap.avatardocid !== undefined) {
                this.avatardocid = oMap.avatardocid;
            }
        } // oMap
    } // constructor
    public get base_prefix(): string {
        return null;
    }
    public set base_prefix(s: string) {

    }
    public get start_key(): any {
        return (this.base_prefix !== null) ? this.base_prefix + '-' : null;
    }
    public set start_key(s: any) {

    }
    public get end_key(): any {
        return (this.start_key !== null) ? this.start_key + '\uffff' : null;
    }
    public get index_name(): string {
        return (this.collection_name !== null) ?
            this.collection_name + '/by_id' : null;
    }
    public set index_name(s: string) {

    }
    public create_id(): string {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        let s = ((new Date()).toISOString()).substr(0, 10) + '-' + sn;
        return (this.base_prefix !== null) ?
            this.base_prefix + '-' + s : s;
    } // create_id
    public check_date(d: Date): Date {
        let dRet = null;
        if ((d !== undefined) && (d !== null)) {
            let t = Date.parse(d.toString());
            if (!isNaN(t)) {
                dRet = new Date(t);
            }
        }
        return dRet;
    } // check_date
    public check_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                dRet = parseFloat(s.toString());
            } catch (e) { }
        }
        return dRet;
    }
    public get type(): string {
        return null;
    }
    public set type(s: string) {

    }
    public get collection_name(): string {
        return null;
    }
    public set collection_name(s: string) {

    }
    public is_storeable(): boolean {
        return (this.type !== null) && (this.collection_name !== null);
    }
    public to_map(oMap: any): void {
        if ((this.id !== undefined) && (this.id !== null)) {
            oMap._id = this.id;
        } else {
            oMap._id = this.create_id();
        }
        if ((this.rev !== undefined) && (this.rev !== null)) {
            oMap._rev = this.rev;
        }
        if ((this.attachments !== undefined) && (this.attachments !== null)) {
            oMap._attachments = this.attachments;
        }
        if ((this.type !== undefined) && (this.type !== null)) {
            oMap.type = this.type;
        }
        if ((this.description !== undefined) && (this.description !== null)) {
            oMap.description = this.description;
        }
        if ((this.avatarid !== undefined) && (this.avatarid !== null)) {
            oMap.avatarid = this.avatarid;
        }
        if ((this.avatardocid !== undefined) && (this.avatardocid !== null)) {
            oMap.avatardocid = this.avatardocid;
        }
    }
    public get text(): string {
        return this.toString();
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public set has_url(b: boolean) {

    }
    public toString(): string {
        let oMap = {};
        this.to_map(oMap);
        return JSON.stringify(oMap);
    } // toString
    public sort_func(p1: IBaseItem, p2: IBaseItem): number {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.id !== undefined) && (p1.id !== null)) {
                if ((p2.id !== undefined) && (p2.id !== null)) {
                    let s1 = p1.id;
                    let s2 = p2.id;
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
    public add_id_to_array(cont: string[], id: string): void {
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0) &&
            (id !== undefined) && (id !== null)) {
            let bFound = false;
            for (let x of cont) {
                if (x == id) {
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                cont.push(id);
            }
        }
    }// add_id_to_array
} // class BaseItem
