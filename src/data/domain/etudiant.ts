//etudiant.ts
//
import {IPerson, IEtudiant} from '../../infodata.d';
import {DepartementPerson} from './departementperson';
import {InfoRoot} from '../inforoot';
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
    public get base_prefix(): string {
        return 'ETD';
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
                x.push('etud');
                pPers.roles = x;
            }
            let cont: string[] = pPers.etudiantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.etudiantids = cont;
        }// pPers
    }// update_person
}// class Etudiant
