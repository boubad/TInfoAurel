// infodata.d.ts
//
export interface IBaseItem {
  id: string;
  rev: string;
  attachments: any;
  avatarid: string;
  avatardocid: string;
  description: string;
  url: string;
  //
  base_prefix: string;
  start_key: any;
  end_key: any;
  index_name: string;
  type: string;
  collection_name: string;
  text: string;
  has_url: boolean;
  //
  is_storeable: () => boolean;
  create_id: () => string;
  check_date: (d: Date) => Date;
  to_map: (oMap: any) => void;
  toString: () => string;
  sort_func: (p1: IBaseItem, p2: IBaseItem) => number;
  add_id_to_array : (cont: string[], id: string) => void;
  //
  sigle?: string;
  name?: string;
  departementid?: string;
  anneeid?: string;
  uniteid?: string;
  matiereid?: string;
  semestreid?: string;
  personid?: string;
  //
  startDate?: Date;
  endDate?: Date;
  //
  genre?: string;
  mat_module?: string;
  coefficient?: number;
  ecs?: number;
  //
  dossier?: string;
  sexe?: string;
  birthDate?: Date;
  ville?: string;
  etablissement?: string;
  serieBac?: string;
  optionBac?: string;
  mentionBac?: string;
  etudesSuperieures?: string;
  //
  isMale?: boolean;
  isFeminin?: boolean;
  //
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  //
  reset_password?: () => void;
  roles?: string[];
  departementids?: string[];
  anneeids?: string[];
  semestreids?: string[];
  uniteids?: string[];
  matiereids?: string[];
  groupeids?: string[];
}// interface IBaseItem
export interface IPerson extends IBaseItem {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: string;
  //
  roles: string[];
  departementids: string[];
  anneeids: string[];
  semestreids: string[];
  uniteids: string[];
  matiereids: string[];
  groupeids: string[];
  //
  reset_password: () => void;
  change_password: (ct: string) => void;
  check_password: (ct: string) => boolean;
  has_role: (r: string) => boolean;
  is_super: boolean;
  is_admin: boolean;
} // interface IPerson
export interface IEtudiantPerson extends IPerson {
  dossier: string;
  sexe: string;
  birthDate: Date;
  ville: string;
  etablissement: string;
  serieBac: string;
  optionBac: string;
  mentionBac: string;
  etudesSuperieures: string;
  //
  isMale: boolean;
  isFeminin: boolean;
}
export interface ISigleNameItem extends IBaseItem {
  sigle: string;
  name: string;
}//interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {

}// interface IDepartement
export interface IDepSigleNameItem extends ISigleNameItem {
  departementid: string;
}
export interface IDepartementChildItem extends IBaseItem{
    departementid: string;
}
export interface IDepartementPerson extends IDepartementChildItem {
    personid: string;
    firstname: string;
    lastname: string;
}
export interface IEnseignant extends IDepartementPerson{
  
}
export interface IEtudiant extends IDepartementPerson{
  
}
export interface IGroupe extends IDepSigleNameItem {

}
export interface IUnite extends IDepSigleNameItem {

}
export interface IMatiere extends IDepSigleNameItem {
  uniteid: string;
  genre: string;
  mat_module: string;
  coefficient: number;
  ecs: number;
}
export interface IIntervalItem extends IDepSigleNameItem {
  startDate: Date;
  endDate: Date;
}
export interface IAnnee extends IIntervalItem {

}
export interface ISemestre extends IIntervalItem {
  anneeid: string;
}
export interface IWorkItem extends IDepartementPerson {
  anneeid:string;
  semestreid:string;
  groupeid:string;
  date:Date;
  status:string;
  genre:string;
}
export interface IAffectationItem extends IWorkItem {
  startDate:Date;
  endDate:Date;
}
export interface IProfAffectationItem extends IAffectationItem {
  enseignantid:string;
  uniteid:string;
  matiereid:string;
}
export interface IEtudAffectationItem extends IAffectationItem {
  etudiantid:string;
}
export interface IItemGenerator {
  create_item: (oMap?: any) => IBaseItem;
  convert_items: (docs: any[]) => IBaseItem[];
}// interface IItemGenerator
export interface IElementDesc {
  id: string;
  rev?: string;
  text: string;
  avatardocid?: string;
  avatarid?: string;
  url?: string;
  personid?: string;
  startDate?: Date;
  endDate?: Date;
  key?: any;
  //
  has_url?: boolean;
}// interface IElementDesc
export interface IDatabaseManager {
  check_admin: () => Promise<any>;
  find_item_by_id: (id: string, bAttach?: boolean) => Promise<IBaseItem>;
  find_person_by_username: (username: string, bAttach?: boolean) => Promise<IPerson>;
  find_items_array: (ids: string[], bAttachments?: boolean) => Promise<IBaseItem[]>;
  find_elements_array: (item: IBaseItem, ids: string[]) => Promise<IElementDesc[]>;
  find_elements: (viewName: string, startKey?: any,
  skip?: number, limit?: number, bDesc?: boolean) => Promise<IElementDesc[]>;
  find_all_elements: (item: IBaseItem, bDesc?: boolean) => Promise<IElementDesc[]>;
  maintains_item: (item: IBaseItem) => Promise<IBaseItem>;
  maintains_items: (items: IBaseItem[]) => Promise<IBaseItem[]>;
  remove_item: (item: IBaseItem) => Promise<any>;
  find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
  maintains_attachment: (docid: string, attachmentId: string,
  attachmentData: Blob, attachmentType: string) => Promise<any>;
  remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
  get_all_items: (item: IBaseItem) => Promise<IBaseItem[]>;
  get_items: (item: IBaseItem, startKey?: any, endKey?: any) => Promise<IBaseItem[]>;
  get_ids: (startkey:string,endKey: any) => Promise<string[]>;
}// IDatabaseManager
