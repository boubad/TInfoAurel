//groupe.ts
//
import {IGroupe} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    constructor(oMap?:any) {
        super(oMap);
    } // constructor
    public get type(): string {
        return 'groupe';
    }
    public set type(s:string){

    }
    public get collection_name(): string {
        return 'groupes';
    }
    public set collection_name(s:string){

    }
    public get base_prefix() : string {
        return 'GRP';
    }
    public set base_prefix(s:string) {

    }
} // class Groupe