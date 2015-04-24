//intervalviewmodel.ts
import {IBaseItem, IIntervalItem} from '../../../infodata.d';
//
import {DepSigleNameModel} from './depsiglenamemodel';
//
export class IntervalViewModel extends DepSigleNameModel {
  //
  constructor(model: IIntervalItem) {
    super(model);
  }// constructor
  public get startDate(): string {
    let x = this.current_item;
    let d = ((x !== undefined) && (x !== null)) ? x.startDate : null;
    return this.date_to_string(d);
  }
  public set startDate(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.startDate = this.string_to_date(s);
    }
  }
  public get endDate(): string {
    let x = this.current_item;
    let d = ((x !== undefined) && (x !== null)) ? x.endDate : null;
    return this.date_to_string(d);
  }
  public set endDate(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.endDate = this.string_to_date(s);
    }
  }
}// class IntervalViewModel
