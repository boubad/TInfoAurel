import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
//
PouchDB.debug.enable('*');
//
@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'InfoApp';
      config.map([
        { route: ['','home'],  moduleId: './viewmodels/login',      nav: true, title:'Accueil' },
        { route: 'admin-router',  moduleId: './viewmodels/admin/admin-router', nav: true, title:'Administration' }
      ]);
    });
  }
}
