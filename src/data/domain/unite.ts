//unite.ts
//
import {IUnite} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
//
export class Unite extends DepSigleNameItem implements IUnite {
    constructor(oMap?:any) {
        super(oMap);
    } // constructor
    public get type(): string {
        return 'unite';
    }
    public set type(s:string){

    }
    public get base_prefix() : string {
        return 'UNT';
    }
    public set base_prefix(s:string){
        
    } 
    
} // class Unite