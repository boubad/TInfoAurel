//depsiglenamemodel.ts
import {IBaseItem, IDepSigleNameItem} from '../../../infodata.d';
//
import {DepartementChildModel} from './departementchildmodel';
//
export class DepSigleNameModel extends DepartementChildModel {
  //
  constructor(model: IDepSigleNameItem) {
    super(model);
  }// constructor
  public get sigle(): string {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.sigle : null;
  }
  public set sigle(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.sigle = s;
    }
  }
  public get name(): string {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.name : null;
  }
  public set name(s: string) {
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)) {
      x.name = s;
    }
  }

}// class DepSigleNameModel
