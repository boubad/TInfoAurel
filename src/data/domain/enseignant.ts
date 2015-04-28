//etudiant.ts
//
import {IPerson, IEnseignant} from '../../infodata.d';
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
     public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.id === null){
                this.id = this.create_id();
            }
            let cont = pPers.enseignantids;
            this.add_id_to_array(cont, this.id);
            pPers.enseignantids = ((cont !== undefined) && (cont !== null)) ? cont : [];
        }// pPers
    }// update_person
}// class Enseignant
