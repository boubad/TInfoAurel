//admin-router.js
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
//
const HOME_ID = '../login';
const NOT_IMPLEMENTED = '../not-implemented';
//
@inject(Router)
export class AdminRouterClass {
  heading = 'Administration';
  constructor(router){
    this.router = router;
    router.configure(config => {
      config.map([
        { route: ['','home'],  moduleId: HOME_ID,      nav: true, title:'Accueil' },
        { route: 'affetuds',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Etudiants' },
        { route: 'semestre',  moduleId:NOT_IMPLEMENTED, nav: true, title:'Semestres' },
        { route: 'annees',  moduleId: './annee-model', nav: true, title:'Années' },
        { route: 'enseignants',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Enseignants' },
        { route: 'groupes',  moduleId: './groupe-model', nav: true, title:'Groupes' },
        { route: 'matieres',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Matières' },
        { route: 'unites',  moduleId: './unite-model', nav: true, title:'Unités' },
        { route: 'departements',  moduleId: './dep-model', nav: true, title:'Départements' }
      ]);
    });
  }// constructor
}