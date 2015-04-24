//etudiant.ts
//
import {IEnseignant} from '../../infodata.d';
import {DepartementPerson} from './departementperson';
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public get type(): string {
        return 'prof';
    }
    public set type(s: string) {

    }
    public get collection_name(): string {
        return 'enseignants';
    }
    public set collection_name(s: string) { }
    public get base_prefix(): string {
        return 'PRF';
    }
    public set base_prefix(s: string) {

    }
}// class Enseignant
