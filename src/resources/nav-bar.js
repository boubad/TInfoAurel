//nav-bar.ts
/// <reference path='../../typings/aurelia/aurelia.d.ts' />
//
import {customElement, bindable} from 'aurelia-framework';

@customElement('nav-bar')
export class NavBarCustomElement {
  @bindable router = null;
}