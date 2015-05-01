//etudiant.ts
//
import {IPerson, IEnseignant} from '../../infodata.d';
import {DepartementPerson} from './departementperson';
import {InfoRoot} from '../inforoot';
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
    public get base_prefix(): string {
        return 'PRF';
    }
    public set base_prefix(s: string) {

    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (!pPers.is_prof){
                let x:string[] = pPers.roles;
                if (x === null){
                    x = [];
                }
                x.push('prof');
                pPers.roles = x;
            }
            let cont: string[] = pPers.enseignantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.enseignantids = cont;
        }// pPers
    }// update_person
}// class Enseignant
