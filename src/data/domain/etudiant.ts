//etudiant.ts
//
import {IPerson, IEtudiant} from '../../infodata.d';
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
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.id === null){
                this.id = this.create_id();
            }
            let cont = pPers.etudiantids;
            this.add_id_to_array(cont, this.id);
            pPers.etudiantids = ((cont !== undefined) && (cont !== null)) ? cont : [];
        }// pPers
    }// update_person
}// class Etudiant
