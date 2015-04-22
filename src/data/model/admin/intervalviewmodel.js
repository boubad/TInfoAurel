import { DepSigleNameModel } from './depsiglenamemodel';
//
export class IntervalViewModel extends DepSigleNameModel {
    //
    constructor(model) {
        super(model);
    } // constructor
    get startDate() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.startDate : null;
    }
    set startDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.startDate = s;
        }
    }
    get endDate() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.endDate : null;
    }
    set endDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.endDate = s;
        }
    }
}
 // class IntervalViewModel
