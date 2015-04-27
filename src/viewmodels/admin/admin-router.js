//admin-router.js
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
//
import {UserInfo} from '../../data/model/userinfo';
//
const HOME_ID = '../login';
const NOT_IMPLEMENTED = '../not-implemented';
//
@inject(Router)
export class AdminRouter {
  heading = 'Administration';
  constructor(router){
    this.router = router;
    this.userInfo = new UserInfo();
    router.configure(config => {
      config.map([
        { route: ['','home'],  moduleId: HOME_ID,      nav: true, title:'Accueil' },
        { route: 'affetuds',  moduleId: './affetud-model', nav: true, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: './affprof-model', nav: true, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: './etud-model', nav: true, title:'Etudiants' },
        { route: 'semestre',  moduleId: './semestre-model', nav: true, title:'Semestres' },
        { route: 'annees',  moduleId: './annee-model', nav: true, title:'Années' },
        { route: 'enseignants',  moduleId: './prof-model', nav: true, title:'Enseignants' },
        { route: 'groupes',  moduleId: './groupe-model', nav: true, title:'Groupes' },
        { route: 'matieres',  moduleId: './matiere-model', nav: true, title:'Matières' },
        { route: 'unites',  moduleId: './unite-model', nav: true, title:'Unités' },
        { route: 'departements',  moduleId: './dep-model', nav: true, title:'Départements' }
      ]);
    });
  }// constructor
  canActivate(){
    let bRet = false;
    let x = this.userInfo;
    if ((x !== undefined) && (x !== null)){
      let pPers = x.person;
      if (pPers !== null){
        bRet = pPers.is_super || pPers.is_admin;
      }
    }
    return bRet;
  }// canActivate
}// AdminRouter