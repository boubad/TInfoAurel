//departement.ts
//
import {IDepartement} from '../../infodata.d';
import {SigleNameItem} from "./siglenameitem";
//
export class Departement extends SigleNameItem implements IDepartement {
  constructor(oMap?:any){
    super(oMap);
  }
  get type():string {
        return 'departement';
    }
    get collection_name():string {
        return 'departements';
    }
    get base_prefix():string {
        return 'DEP';
    }
    get index_name(): string {
        return this.collection_name + '/by_sigle';
    }
}// class IDepartement
