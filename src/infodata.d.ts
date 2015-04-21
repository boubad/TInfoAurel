// infodata.d.ts
//
export interface IBaseItem {
	id:string;
     rev:string;
     attachments:any;
     avatarid:string;
     description:string;
     //
     base_prefix:string;
     start_key:string;
     end_key:string;
     index_name:string;
     type:string;
     collection_name :string;
     //
     is_storeable:()=>boolean;
     create_id: ()=>string;
     check_date: (d:Date) => Date;
     to_map: (oMap:any) => void;
     toString: () =>string;
     sort_func : (p1:IBaseItem, p2:IBaseItem)=> number;
	}// interface IBaseItem
export interface IPerson extends IBaseItem {
      username:string;
      password:string;
      firstname:string;
      lastname:string;
      fullname:string;
      email:string;
      phone:string;
      //
      roles:string[];
      departementids:string[];
      anneeids:string[];
      semestreids:string[];
      uniteids:string[];
      matiereids:string[];
      groupeids:string[];
      //
      reset_password: () => void;
      change_password: (ct:string) => void;
      check_password: (ct:string) => boolean;
      has_role: (r:string) => boolean;
      is_super: boolean;
      is_admin: boolean;
     } // interface IPerson
export interface ISigleNameItem extends IBaseItem {
	sigle:string;
	name: string;
}//interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {

}// interface IDepartement
export interface IItemGenerator {
     create_item : (oMap?:any) => IBaseItem;
     convert_items: (docs:any[]) => IBaseItem[];
     }// interface IItemGenerator
export interface IElementDesc {
     id:string;
     rev?:string;
     text:string;
     avatardocid?:string;
     avatarid?:string;
     url?:string;
     personid?:string;
     startDate?:Date;
     endDate?:Date;
     //
     has_url?:boolean;
}// interface IElementDesc
export interface IDatabaseManager {
     check_admin: () => Promise<any>;
     find_item_by_id: (id:string,bAttach?:boolean) => Promise<IBaseItem>;
     find_person_by_username: (username:string,bAttach?:boolean) => Promise<IPerson>;
     find_items_array: (ids:string[],bAttachments?:boolean) => Promise<IBaseItem[]> ;
     find_elements: (viewName:string,startKey?:any,
      skip?:number,limit?:number,bDesc?:boolean) => Promise<IElementDesc[]>;
     maintains_item : (item:IBaseItem) => Promise<IBaseItem>;
     maintains_items : (items:IBaseItem[]) => Promise<IBaseItem[]>;
     remove_item : (item:IBaseItem) => Promise<any>;
    find_attachment: (docid:string,attachmentId:string) => Promise<Blob>;
    maintains_attachment : (docid:string,attachmentId:string,
    attachmentData:Blob,attachmentType:string) => Promise<any>;
    remove_attachment : (docid:string,attachmentId:string) => Promise<any>;
     }// IDatabaseManager
