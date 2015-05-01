//matiere.ts
//
import {IMatiere} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglenameitem';
import {InfoRoot} from '../inforoot';
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
    public set base_prefix(s: string) {

    }
    public get type(): string {
        return 'matiere';
    }
    public set type(s: string) {

    }
    public get start_key(): any {
        let s = this.base_prefix;
        if ((s !== null) && (this.uniteid !== null)) {
            s = s + '-' + this.uniteid;
        }
        return s;
    }
    public set start_key(s: any) {
    }
    public get ecs(): number {
        return this._ecs;
    }
    public set ecs(d: number) {
        let v = InfoRoot.check_number(d);
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
        let v = InfoRoot.check_number(d);
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
        if (this.genre !== null) {
            oMap.genre = this.genre;
        }
        if (this.mat_module !== null) {
            oMap.mat_module = this.mat_module;
        }
        if (this.coefficient !== null) {
            oMap.coefficient = this.coefficient;
        }
        if (this.ecs !== null) {
            oMap.ecs = this.ecs;
        }
    }// to_insert_map
} // class Unite