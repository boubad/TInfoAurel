//profviewmodel.ts²
import {PersonViewModel} from './personviewmodel';
import {Person} from '../../domain/person';
import {Enseignant} from '../../domain/enseignant';
//
//
export class EnseignantViewModel extends PersonViewModel{
    constructor(){
        super(new Enseignant(), new Person());
    }
}