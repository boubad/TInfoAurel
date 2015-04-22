//intervalviewmodel.ts
import {IBaseItem, IDepartement, IDepSigleNameItem, IIntervalItem} from '../../../infodata.d';
//
import {DepSigleNameModel} from './depsiglenamemodel';
import {Departement} from '../../domain/departement';
//
export class IntervalViewModel extends DepSigleNameModel {
  //
  constructor(model: IIntervalItem) {
    super(model);
    this.isDescending = true;
  }// constructor
  public get startDate(): string {
    let x = this.current_item;
    let d = ((x !== undefined) && (x !== null)) ? x.startDate : null;
    if (d === null){
      return null;
    }
    let t = Date.parse(d.toString());
    if (isNaN(t)){
      return null;
    }
    let dt = new Date(t);
    return dt.toISOString().substr(0,10);
  }
  public set startDate(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
       let t = Date.parse(s);
       let d = (isNaN(t)) ? null : new Date(t);
       x.startDate = d;
    }
  }
   public get endDate(): string {
    let x = this.current_item;
    let d = ((x !== undefined) && (x !== null)) ? x.endDate : null;
    if (d === null){
      return null;
    }
    let t = Date.parse(d.toString());
    if (isNaN(t)){
      return null;
    }
    let dt = new Date(t);
    return dt.toISOString().substr(0,10);
  }
  public set endDate(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      let t = Date.parse(s);
       let d = (isNaN(t)) ? null : new Date(t);
       x.endDate = d;
    }
  }
}// class IntervalViewModel
