//matiere.ts
//
import {IMatiere} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
//
export class Matiere extends DepSigleNameItem implements IMatiere {
    //
    public uniteid: string;
    public genre: string;
    public mat_module: string;
    public _coef: number;
    public _ecs: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.genre = null;
        this.mat_module = null;
        this._coef = null;
        this._ecs = null;
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this.mat_module = oMap.mat_module;
            }
        }// oMap
    } // constructor
    public get base_prefix(): string {
        return 'MAT';
    }
    public set base_prefix(s:string){

    }
    public get type(): string {
        return 'matiere';
    }
    public set type(s:string){

    }
    public get collection_name(): string {
        return 'matieres';
    }
    public set collection_name(s:string){

    }
    public create_id() : string {
        let s = this.base_prefix;
        if ((s !== null) && (this.uniteid !== null)){
            s = s + '-' + this.uniteid;
        }
        if ((s !== null) && (this.sigle !== null)){
            s = s + '-' + this.sigle.toUpperCase();
        }
        return s;
    } // create_id
    public get start_key():any{
         let s = this.base_prefix;
        if ((s !== null) && (this.uniteid !== null)){
            s = s + '-' + this.uniteid;
        }
        return s;
    }
    public set start_key(s:any) {
    }
    public get ecs(): number {
        return this._ecs;
    }
    public set ecs(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._ecs = v;
        } else {
            this._ecs = null;
        }
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = null;
        }
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.uniteid = this.uniteid;
        oMap.genre = this.genre;
        oMap.mat_module = this.mat_module;
        oMap.coefficient = this.coefficient;
        oMap.ecs = this.ecs;
    }// to_insert_map
} // class Unite