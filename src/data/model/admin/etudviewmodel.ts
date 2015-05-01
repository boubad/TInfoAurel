//etudviewmodel.ts²
//
import {IBaseItem} from '../../../infodata.d';
//
import {PersonViewModel} from './personviewmodel';
import {EtudiantPerson} from '../../domain/etudperson';
import {Etudiant} from '../../domain/etudiant';
import {InfoRoot} from '../../inforoot';
//
//
export class EtudiantViewModel extends PersonViewModel {
    constructor() {
        super(new Etudiant(), new EtudiantPerson());
    }
    protected create_person(): IBaseItem {
        return new EtudiantPerson();
    }
    protected post_change_item() : any{
        let self = this;
        return super.post_change_item().then((r)=>{
            let id  = (self.current_item !== null) ? self.current_item.id : null;
            self.userInfo.etudiantid = id;
            return true;
            });
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
        return InfoRoot.date_to_string(d);
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if ((x !== undefined) && (x !== null)) {
            x.birthDate = InfoRoot.string_to_date(s);
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