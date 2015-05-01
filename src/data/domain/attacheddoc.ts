//attacheddoc.ts
//
import {IAttachmentDesc} from '../../infodata.d';
//
export class AttachedDoc implements IAttachmentDesc {
    public id: string;
    public name: string;
    public description: string;
    public keywords: string[];
    //
    constructor(oMap?: any) {
        this.id = null;
        this.name = null;
        this.description = null;
        this.keywords = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.id !== undefined) {
                this.id = oMap.id;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
            if (oMap.keywords !== undefined) {
                this.keywords = oMap.keywords;
            }
        }// oMap
    }// constructor
}// class AttachedDoc