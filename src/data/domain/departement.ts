//departement.ts
//
import {IDepartement} from '../../infodata.d';
import {SigleNameItem} from "./siglenameitem";
//
export class Departement extends SigleNameItem implements IDepartement {
  constructor(oMap?:any){
    super(oMap);
  }
    public get type():string {
        return 'departement';
    }
    public set type(s:string){

    }
    public get collection_name():string {
        return 'departements';
    }
    public set collection_name(s:string){

    }
    public get base_prefix():string {
        return 'DEP';
    }
    public set base_prefix(s:string){

    }
    public get index_name(): string {
        return this.collection_name + '/by_sigle';
    }
    public set index_name(s:string){
        
    }
}// class IDepartement
