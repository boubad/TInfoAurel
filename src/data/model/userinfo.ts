//userinfo.ts
//
import {IPerson} from '../../infodata.d';
import {Person} from '../domain/person';
import {SessionObjectStore} from './sessionstore';
//
declare var window:any;
//
export class UserInfo extends SessionObjectStore {
  private _person:IPerson;
  //
  constructor() {
    super();
    this._person = null;
  }// constructor
  public get username():string {
    return super.get_value('username');
  }
  public set username(s:string){
    super.store_value('username',s);
  }
  public get description():string {
    return super.get_value('description');
  }
  public set description(s:string){
    super.store_value('description',s);
  }
  public get phone(): string {
    return super.get_value('phone');
  }
  public set phone(s:string){
    super.store_value('phone',s);
  }
  public get email(): string {
    return super.get_value('email');
  }
  public set email(s:string){
    super.store_value('email',s);
  }
  public get fullname(): string {
    return super.get_value('fullname');
  }
  public set fullname(s:string){
    super.store_value('fullname',s);
  }
  public get lastname(): string {
    return super.get_value('lastname');
  }
  public set lastname(s:string){
    super.store_value('lastname',s);
  }
  public get firstname(): string {
    return super.get_value('firstname');
  }
  public set firstname(s:string){
    super.store_value('firstname',s);
  }
  public get photoUrl(): string {
    return super.get_value('photoUrl');
  }
  public set photoUrl(s:string){
    let old = super.get_value('photoUrl');
    if (old !== null){
      window.URL.revokeObjectURL(old);
    }
    super.store_value('photoUrl',s);
  }
  public get hasPhoto(): boolean {
    return (this.photoUrl !== null);
  }
  public get groupeid(): string {
    return super.get_value('groupeid');
  }
  public set groupeid(s:string){
    super.store_value('groupeid',s);
  }
  public get matiereid(): string {
    return super.get_value('matiereid');
  }
  public set matiereid(s:string){
    super.store_value('matiereid',s);
  }
  public get uniteid(): string {
    return super.get_value('uniteid');
  }
  public set uniteid(s:string){
    super.store_value('uniteid',s);
    this.matiereid = null;
  }
  public get semestreid(): string {
    return super.get_value('semestreid');
  }
  public set semestreid(s:string){
    super.store_value('semestreid',s);
  }
  public get anneeid() : string {
    return super.get_value('anneeid');
  }
  public set anneeid(s: string){
    super.store_value('anneeid',s);
    this.semestreid = null;
  }
  public get departementid() : string {
    return super.get_value('departementid');
  }
  public set departementid(s:string){
    super.store_value('departementid',s);
    this.anneeid = null;
    this.groupeid = null;
    this.uniteid = null;
  }
  public get personid() : string {
    return super.get_value('personid');
  }
  public set personid(s:string){
    super.store_value('personid',s);
  }
  public get personrev(): string {
    return super.get_value('personrev');
  }
  public set personrev(s:string) {
    super.store_value('personrev',s);
  }
  public get password(): string {
    return super.get_value('password');
  }
  public set password(s:string){
    super.store_value('password',s);
  }
  public get avatarid():string {
    return super.get_value('avatarid');
  }
  public set avatarid(s:string){
    super.store_value('avatarid', s);
  }
  public get enseignantid():string {
    return super.get_value("enseignantid");
  }
  public set enseignantid(s:string){
    super.store_value("enseignantid", s);
  }
  public get etudiantid():string {
    return super.get_value("etudiantid");
  }
  public set etudiantid(s:string){
    super.store_value("etudiantid", s);
  }
  //
  public get person() : IPerson {
    if (this._person !== null){
      return this._person;
    }
    let sval = super.get_value('person');
    if (sval === null){
      return null;
    }
    try {
         let oMap = JSON.parse(sval);
         this._person = new Person(oMap);
    }catch(e){
        console.log('UserInfo get person error: ' + JSON.stringify(e));
    }
    return this._person;
  }
  public set person(pPers:IPerson) {
    let p = (pPers !== undefined) ? pPers : null;
    super.store_value('person',null);
    this.photoUrl = null;
    this.avatarid = null;
    this._person = null;
    this.personid = null;
    this.password = null;
    this.personrev = null;
    this.departementid = null;
    this.anneeid = null;
    this.semestreid = null;
    this.uniteid = null;
    this.matiereid = null;
    this.groupeid = null;
    this.firstname = null;
    this.lastname = null;
    this.fullname = null;
    this.username = null;
    this.email = null;
    this.phone = null;
    this.description = null;
    this.enseignantid = null;
    this.etudiantid = null;
    if ((p !== null) && (p.id !== null)) {
       let oMap  = {};
       p.to_map(oMap);
       super.store_value('person',JSON.stringify(oMap));
      let docid = p.id;
      this.personid = docid;
      this.personrev = p.rev;
      this.username = p.username;
      this.firstname = p.firstname;
      this.lastname = p.lastname;
      this.fullname = p.fullname;
      this.email = p.email;
      this.phone = p.phone;
      this.password = p.password;
      this.description = p.description;
      this.avatarid = p.avatarid;
      if (p.has_role('prof')){
        this.enseignantid = docid;
      }
      if (p.has_role('etud')){
        this.etudiantid = docid;
      }
  }
}
public get isConnected(){
    let p = this.person;
    return ((p !== undefined) && (p !== null) && (p.id !== undefined) && (p.id !== null));
  }// isConnected
}// class UserInfo