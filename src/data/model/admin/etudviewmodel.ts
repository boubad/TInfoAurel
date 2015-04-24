//etudviewmodel.ts²
//
import {IBaseItem} from '../../../infodata.d';
//
import {PersonViewModel} from './personviewmodel';
import {EtudiantPerson} from '../../domain/etudperson';
import {Etudiant} from '../../domain/etudiant';
//
//
export class EtudiantViewModel extends PersonViewModel {
    constructor() {
        super(new Etudiant(), new EtudiantPerson());
    }
    protected create_person(): IBaseItem {
        return new EtudiantPerson();
    }
    post_change_item() {
        super.post_change_item();
        let id = (this.current_item !== null) ? this.current_item.id : null;
        this.userInfo.etudiantid = id;
        return true;
    }
    public get dossier(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.dossier;
        }
        return null;
    }
    public set dossier(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.dossier = s;
        }
    }
    public get sexe(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.sexe;
        }
        return null;
    }
    public set sexe(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.sexe = s;
        }
    }
    public get birthDate(): string {
        let x = this.currentPerson
        let d = ((x !== undefined) && (x !== null)) ? x.birthDate : null;
        return this.date_to_string(d);
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if ((x !== undefined) && (x !== null)) {
            x.birthDate = this.string_to_date(s);
        }
    }
    public get ville(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.ville;
        }
        return null;
    }
    public set ville(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.ville = s;
        }
    }
    public get etablissement(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.etablissement;
        }
        return null;
    }
    public set etablissement(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.etablissement = s;
        }
    }
    public get serieBac(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.serieBac;
        }
        return null;
    }
    public set serieBac(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.serieBac = s;
        }
    }
    public get optionBac(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.optionBac;
        }
        return null;
    }
    public set optionBac(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.optionBac = s;
        }
    }
    public get mentionBac(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.mentionBac;
        }
        return null;
    }
    public set mentionBac(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            return p.etudesSuperieures;
        }
        return null;
    }
    public set etudesSuperieures(s: string) {
        let p = this.currentPerson;
        if ((p !== undefined) && (p !== null)) {
            p.etudesSuperieures = s;
        }
    }
}// class EtudiantViewModel