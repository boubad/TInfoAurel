//baseitem.ts
//
import {IBaseItem,IAttachmentDesc} from '../../infodata.d';
import {InfoRoot} from '../inforoot';
//
export class BaseItem extends InfoRoot implements IBaseItem {
    public id: string;
    public rev: string;
    public attachmentsDesc:IAttachmentDesc[];
    public attachments: any;
    public avatarid: string;
    public avatardocid: string;
    public description: string;
    public url: string;
    private _selected;
    //
    constructor(oMap?: any) {
        super();
        this.id = null;
        this.rev = null;
        this.attachmentsDesc = null;
        this.attachments = null;
        this.avatarid = null;
        this.avatardocid = null;
        this.description = null;
        this.url = null;
        this._selected = false;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
            if (oMap.attachmentsDesc !== undefined){
                this.attachmentsDesc = oMap.attachmentsDesc;
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
    public get isSelected():boolean{
        return this._selected;
    }
    public set isSelected(s:boolean){
        this._selected = ((s !== undefined) && (s !== null)) ? s : false;
    }
    public get base_prefix(): string {
        return null;
    }
    public set base_prefix(s:string){}
    public get start_key(): string {
        return (this.base_prefix !== null) ? this.base_prefix : null;
    }
    public set start_key(s:string){}
    public get end_key(): any {
        return (this.start_key !== null) ? this.start_key + '\uffff' : null;
    }
    public create_id(): string {
       return InfoRoot.create_date_random_id();
    } // create_id
    public get type(): string {
        return null;
    }
    public set type(s:string){}
    public is_storeable(): boolean {
        return (this.type !== null);
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
        if ((this.attachmentsDesc !== undefined) && (this.attachmentsDesc !== null)){
            oMap.attachmentsDesc = this.attachmentsDesc;
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
} // class BaseItem
