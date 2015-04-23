//appconfig.ts
//index.ts
/// <reference path='../typings/aurelia/aurelia.d.ts' />
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia:Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./resources/index')
    .plugin('aurelia-validation',(config)=>{config.useLocale('fr-FR')});
 //   
  aurelia.start().then(a => a.setRoot());
}