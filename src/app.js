import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
//
//PouchDB.debug.enable('*');
//
@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'InfoApp';
      config.map([
        { route: ['','login'],  moduleId: './viewmodels/login',      nav: true, title:'Connexion' },
        { route: 'admin-home',  moduleId: './viewmodels/admin-home', nav: false, title:'Accueil' },
        { route: 'prof-home',  moduleId: './viewmodels/prof-home', nav: false, title:'Accueil' },
        { route: 'etud-home',  moduleId: './viewmodels/etud-home', nav: false, title:'Accueil' },
        { route: 'profil',  moduleId: './viewmodels/profil-model', nav: true, title:'Profil' },
        { route: 'admin-router',  moduleId: './viewmodels/admin/admin-router', nav: true, title:'Administration' }
      ]);
    });
  }// constructor
}
