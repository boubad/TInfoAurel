//etudiant.ts
//
import {IEtudiant} from '../../infodata.d';
import {DepartementPerson} from './departementperson';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public get type(): string {
        return 'etudiant';
    }
    public set type(s: string) {

    }
    public get collection_name(): string {
        return 'etudiants';
    }
    public set collection_name(s: string) { }
    public get base_prefix(): string {
        return 'ETD';
    }
    public set base_prefix(s: string) {

    }
}// class Etudiant
