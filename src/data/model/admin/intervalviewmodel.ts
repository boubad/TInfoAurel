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
  }// constructor
  public get startDate(): Date {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.startDate : null;
  }
  public set startDate(s: Date) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.startDate = s;
    }
  }
   public get endDate(): Date {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.endDate : null;
  }
  public set endDate(s: Date) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.endDate = s;
    }
  }
}// class IntervalViewModel
