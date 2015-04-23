// etudperson.ts
//
import {IEtudiantPerson} from '../../infodata.d';
import {Person} from './person';
//
export class EtudiantPerson extends Person implements IEtudiantPerson {
  public dossier: string;
  public sexe: string;
  private _date: Date;
  public ville: string;
  public etablissement: string;
  public serieBac: string;
  public optionBac: string;
  public mentionBac: string;
  public etudesSuperieures: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this.dossier = null;
    this.sexe = null;
    this._date = null;
    this.ville = null;
    this.etablissement = null;
    this.serieBac = null;
    this.optionBac = null;
    this.mentionBac = null;
    this.etudesSuperieures = null;
    this.roles = ['etud'];
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.dossier !== undefined) {
        this.dossier = oMap.dossier;
      }
      if (oMap.sexe !== undefined) {
        this.sexe = oMap.sexe;
      }
      if (oMap.birthDate !== undefined) {
        this.birthDate = oMap.birthDate;
      }
      if (oMap.etablissement !== undefined) {
        this.etablissement = oMap.etablissement;
      }
      if (oMap.ville !== undefined) {
        this.ville = oMap.ville;
      }
      if (oMap.serieBac !== undefined) {
        this.serieBac = oMap.serieBac;
      }
      if (oMap.optionBac !== undefined) {
        this.optionBac = oMap.optionBac;
      }
      if (oMap.mentionBac != undefined) {
        this.mentionBac = oMap.mentionBac;
      }
      if (oMap.etudesSuperieures !== undefined) {
        this.etudesSuperieures = oMap.etudesSuperieures;
      }
    } // oMap
  } // constructor
  public get type(): string {
    return "etudperson";
  }
  public set type(s: string) {

  }
  //
  public get birthDate(): Date {
    return this._date;
  }
  public set birthDate(s: Date) {
    this._date = this.check_date(s);
  }

  //
  public get isMale(): boolean {
    return ((this.sexe !== null) && (this.sexe == 'masculin'));
  }
  public set isMale(b: boolean) {
    if ((b !== undefined) && (b !== null)) {
      this.sexe = (b == true) ? 'masculin' : 'feminin';
    }
  }
  public get isFeminin(): boolean {
    return ((this.sexe !== null) && (this.sexe == 'feminin'));
  }
  public set isFeminin(b: boolean) {
    if ((b !== undefined) && (b !== null)) {
      this.sexe = (b == true) ? 'feminin' : 'masculin';
    }
  }
  public to_map(oMap: any): void {
    super.to_map(oMap);
    oMap.dossier = this.dossier;
    oMap.sexe = this.sexe;
    oMap.birthDate = this.birthDate;
    oMap.ville = this.ville;
    oMap.etablissement = this.etablissement;
    oMap.serieBac = this.serieBac;
    oMap.optionBac = this.optionBac;
    oMap.mentionBac = this.mentionBac;
    oMap.etudesSuperieures = this.etudesSuperieures;
  } // to_insert_map
} // class EtudiantPerson
