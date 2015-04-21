//baseitem.ts
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {IBaseItem} from '../../infodata.d';
//
export class BaseItem implements IBaseItem {
    public id:string;
    public rev:string;
    public attachments:any;
    public avatarid:string;
    public description:string;
    //
    constructor(oMap?:any) {
        this.id = null;
        this.rev = null;
        this.attachments = null;
        this.avatarid = null;
        this.description = null;
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
        } // oMap
    } // constructor
    public get base_prefix():string {
        return null;
    }
    public get start_key():string{
        return (this.base_prefix !== null) ? this.base_prefix + '-' : null;
    }
    public get end_key():string{
        return (this.start_key !== null) ? this.start_key + '\uffff' : null;
    }
    public get index_name():string {
        return (this.collection_name !== null) ?
            this.collection_name + '/by_id' : null;
    }
    public create_id() :string {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        let s = ((new Date()).toISOString()).substr(0, 10) + '-' + sn;
        return (this.base_prefix !== null) ?
            this.base_prefix + '-' + s : s;
    } // create_id
    public check_date(d:Date) : Date{
        let dRet = null;
        if ((d !== undefined) && (d !== null)) {
            let t = Date.parse(d.toString());
            if (!isNaN(t)) {
                dRet = d;
            }
        }
        return dRet;
    } // check_date
    public get type():string {
        return null;
    }
    public get collection_name() :string{
        return null;
    }
    public is_storeable():boolean{
        return (this.type !== null) && (this.collection_name !== null);
    }
    public to_map(oMap:any) : void {
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
    }
    public toString():string {
        let oMap = {};
        this.to_map(oMap);
        return JSON.stringify(oMap);
    } // toString
   public sort_func(p1:BaseItem, p2:BaseItem): number{
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
} // class BaseItem