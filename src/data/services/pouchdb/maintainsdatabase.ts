//maintainsdatabase.ts
//
/// <reference path='../../../../typings/pouchdb/pouchdb.d.ts' />
//
import {PouchDatabase} from './pouchdatabase';
//
export class MaintainsDatabase extends PouchDatabase {
	constructor(name?:string){
		super(name);
	}//constructor
	protected remove_data(viewName:string) : Promise<any> {
    let xdb:PouchDB = null;
    return this.db.then((d) => {
      xdb = d;
      return xdb.query(viewName);
    }).then((dd) => {
        let docs: any[] = [];
        for (let r of dd.rows) {
          let doc = { _id: r.value.id, _rev: r.value.rev, _deleted: true };
          docs.push(doc);
        }// i
        return xdb.bulkDocs(docs);
      });
  }// remove_data
   private create_persons_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/persons',
      views: {
        by_names: {
          map: function(doc) {
            if (doc.type !== undefined) {
              if ((doc.type == 'person') || (doc.type == 'profperson') ||
                (doc.type == 'etudperson') || (doc.type == 'operperson') ||
                (doc.type == 'adminperson')) {
                if ((doc.username !== undefined) && (doc.firstname !== undefined)
                  && (doc.lastname !== undefined)) {
                  let name = doc.lastname + ' ' + doc.firstname;
                  let avatarid = (doc.avatarid) ? doc.avatarid : null;
                  emit([doc.lastname, doc.firstname, doc.username],
                    {
                      id: doc._id,
                      rev: doc._rev,
                      text: name,
                      avatardocid: doc._id,
                      avatarid: avatarid
                    }
                    );
                }
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_persons_design_docs
  private create_departements_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/departements',
      views: {
        by_sigle: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'departement')) {
              if (doc.sigle !== undefined) {
                let key = doc.sigle;
                let name = (doc.name !== undefined) ? doc.name : key;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_departements_design_docs
  private create_unites_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/unites',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'unite')) {
              if ((doc.departementid !== undefined) && (doc.sigle !== undefined)) {
                let key = [doc.departementid, doc.sigle];
                let name = (doc.name) ? doc.name : doc.sigle;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_unite_design_docs
  private create_groupes_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/groupes',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'groupe')) {
              if ((doc.departementid !== undefined) && (doc.sigle !== undefined)) {
                let key = [doc.departementid, doc.sigle];
                let name = (doc.name) ? doc.name : doc.sigle;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_groupe_design_docs
  private create_annees_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/annees',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'annee')) {
              if ((doc.departementid !== undefined) && (doc.sigle !== undefined) &&
                (doc.startDate !== undefined) && (doc.endDate !== undefined)) {
                let key = [doc.departementid, doc.sigle];
                let name = (doc.name) ? doc.name : doc.sigle;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid,
                  startDate: doc.startDate,
                  endDate: doc.endDate
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_annees_design_docs
  private create_semestres_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/semestres',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'semestre')) {
              if ((doc.anneeid !== undefined) && (doc.sigle !== undefined) &&
                (doc.startDate !== undefined) && (doc.endDate !== undefined)) {
                let key = [doc.anneeid, doc.sigle];
                let name = (doc.name) ? doc.name : doc.sigle;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid,
                  startDate: doc.startDate,
                  endDate: doc.endDate
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_semestres_design_docs
  private create_matieres_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/matieres',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'matiere')) {
              if ((doc.departementid !== undefined) && (doc.uniteid !== undefined)
                && (doc.sigle !== undefined)) {
                let key = [doc.departementid, doc.uniteid, doc.sigle];
                let name = (doc.name) ? doc.name : doc.sigle;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_matieres_design_docs
  private create_etudiants_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/etudiants',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
              if ((doc.departementid !== undefined) &&
                (doc.personid !== undefined) && (doc.firstname !== undefined) &&
                (doc.lastname !== undefined)) {
                let key = [doc.departementid, doc.lastname, doc.firstname];
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_etudiants_design_docs
  private create_enseignants_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/enseignants',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'enseignant')) {
              if ((doc.departementid !== undefined) &&
                (doc.personid !== undefined) && (doc.firstname !== undefined) &&
                (doc.lastname !== undefined)) {
                let key = [doc.departementid, doc.lastname, doc.firstname];
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_enseignants_design_docs
  private create_operators_design_docs(): Promise<any> {
    let ddoc = {
      _id: '_design/operators',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'operator')) {
              if ((doc.departementid !== undefined) &&
                (doc.personid !== undefined) && (doc.lastname !== undefined) &&
                (doc.firstname !== undefined)) {
                let key = [doc.departementid, doc.lastname, doc.firstname];
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_operator_design_docs
  private create_administrators_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/administrators',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'administrator')) {
              if ((doc.departementid !== undefined) &&
                (doc.personid !== undefined) && (doc.lastname !== undefined) &&
                (doc.firstname !== undefined)) {
                let key = [doc.departementid, doc.lastname, doc.firstname];
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_administrators_design_docs
  private create_profaffectations_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/profaffectations',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
              if ((doc.semestreid !== undefined) && (doc.matiereid !== undefined) &&
                (doc.enseignantid !== undefined) && (doc.personid !== undefined) &&
                (doc.groupeid !== undefined) && (doc.firstname !== undefined) &&
                (doc.lastname !== undefined)) {
                let key = [doc.semestreid, doc.matiereid, doc.enseignantid, doc.groupeid];
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                let val = [doc.personid, doc.lastname, doc.firstname, avatarid];
                emit(key, {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_profaffectation_design_docs
  private create_etudaffectations_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/etudaffectations',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'etudaffectation')) {
              if ((doc.semestreid !== undefined) && (doc.groupeid !== undefined) &&
                (doc.etudiantid !== undefined) && (doc.personid !== undefined) &&
                (doc.firstname !== undefined) && (doc.lastname !== undefined)) {
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit([1, doc.semestreid, doc.groupeid, doc.lastname, doc.firstname],
                  {
                    id: doc._id,
                    rev: doc._rev,
                    text: name,
                    avatardocid: doc.personid,
                    avatarid: avatarid,
                    personid: doc.personid
                  });
                emit([2, doc.personid], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_etudaffectation_design_docs
  private create_groupeevents_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/groupeevents',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'groupeevent')) {
              if ((doc.semestreid !== undefined) && (doc.matiereid !== undefined)
                && (doc.profaffectationid !== undefined) && (doc.date !== undefined) &&
                (doc.name !== undefined) && (doc.enseignantid !== undefined) &&
                (doc.matiereid !== undefined) && (doc.groupeid !== undefined)) {
                let name = doc.name;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit([1, doc.semestreid, doc.profaffectationid], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
                emit([2, doc.semestreid, doc.matiereid], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
                emit([3, doc.semestreid, doc.enseignantid], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc._id,
                  avatarid: avatarid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_groupeevents_design_docs
  private create_etudevents_design_docs() : Promise<any> {
    let ddoc = {
      _id: '_design/etudevents',
      views: {
        by_id: {
          map: function(doc) {
            if ((doc.type !== undefined) && (doc.type == 'etudevent')) {
              if ((doc.semestreid !== undefined) && (doc.etudiantid !== undefined) &&
                (doc.groupeeventid !== undefined) && (doc.personid !== undefined) &&
                (doc.genre !== undefined) && (doc.firstname !== undefined) &&
                (doc.lastname !== undefined)) {
                let name = doc.lastname + ' ' + doc.firstname;
                let avatarid = (doc.avatarid) ? doc.avatarid : null;
                emit([1, doc.groupeeventid, doc.genre, doc.lastname, doc.firstname], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
                emit([2, doc.etudiantid, doc.genre], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
                emit([3, doc.semestreid, doc.genre, doc.lastname, doc.firstname], {
                  id: doc._id,
                  rev: doc._rev,
                  text: name,
                  avatardocid: doc.personid,
                  avatarid: avatarid,
                  personid: doc.personid
                });
              }
            }
          }.toString()
        }
      }
    };
    return this.maintains_doc(ddoc);
  }//create_etudevents_design_docs
  //
  public create_design_docs() : Promise<any> {
    let pp:Promise<any>[] = [];
    pp.push(this.create_persons_design_docs());
    pp.push(this.create_departements_design_docs());
    pp.push(this.create_groupes_design_docs());
    pp.push(this.create_unites_design_docs());
    pp.push(this.create_annees_design_docs());
    pp.push(this.create_semestres_design_docs());
    pp.push(this.create_matieres_design_docs());
    pp.push(this.create_etudiants_design_docs());
    pp.push(this.create_enseignants_design_docs());
    pp.push(this.create_operators_design_docs());
    pp.push(this.create_administrators_design_docs());
    pp.push(this.create_profaffectations_design_docs());
    pp.push(this.create_etudaffectations_design_docs());
    pp.push(this.create_groupeevents_design_docs());
    pp.push(this.create_etudevents_design_docs());
    return Promise.all(pp);
  }//create_design_docs
  public check_schema(): Promise<any> {
      let id = '_design/departements';
      let self = this;
      return this.db.then((xdb) =>{
        return xdb.get(id);
        }).then((p)=>{
            return true;
          },(err)=>{
            if (err.status == 404){
                return self.create_design_docs();
              } else {
                throw new Error(err.status);
              }
            });
    }// check_schema
}// class MaintainsDatabase
