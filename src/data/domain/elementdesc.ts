//elementdesc.ts
//
import {IElementDesc} from '../../infodata.d';
//
export class ElementDesc implements IElementDesc {
	//
	 public id:string;
	 public rev:string;
     public text:string;
     public avatardocid:string;
     public avatarid:string;
     public url:string;
     public personid:string;
     public startDate:Date;
     public endDate:Date;
     public key:any;
     //
  constructor(oMap?: any) {
    this.id = null;
    this.text = null;
    this.rev = null;
    this.avatardocid = null;
    this.avatarid = null;
    this.url = null;
    this.personid = null;
    this.startDate = null;
    this.endDate = null;
    this.key = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.id !== undefined) {
        this.id = oMap.id;
      }
      if (oMap.rev !== undefined) {
        this.rev = oMap.rev;
      }
      if (oMap.text !== undefined) {
        this.text = oMap.text;
      }
      if (oMap.avatardocid !== undefined) {
        this.avatardocid = oMap.avatardocid;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
      if (oMap.key !== undefined){
        this.key = oMap.key;
      }
    }// oMap
  }// constructor
  public get hasUrl(): boolean {
    return ((this.url !== undefined) &&
      (this.url !== null) && (this.url.trim().length > 0));
  }
  public set hasUrl(b:boolean){

  }
  public toString():string {
    return this.text;
  }
}// class ElementDesc