//index.ts
/// <reference path='../../typings/aurelia/aurelia.d.ts' />
//
import {Aurelia} from 'aurelia-framework';

export function install(aurelia:Aurelia){
	aurelia.globalizeResources('./nav-bar');
}