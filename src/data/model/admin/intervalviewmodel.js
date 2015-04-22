import { DepSigleNameModel } from './depsiglenamemodel';
//
export class IntervalViewModel extends DepSigleNameModel {
    //
    constructor(model) {
        super(model);
        this.isDescending = true;
    } // constructor
    get startDate() {
        let x = this.current_item;
        let d = ((x !== undefined) && (x !== null)) ? x.startDate : null;
        return this.date_to_string(d);
    }
    set startDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.startDate = this.string_to_date(s);
        }
    }
    get endDate() {
        let x = this.current_item;
        let d = ((x !== undefined) && (x !== null)) ? x.endDate : null;
        return this.date_to_string(d);
    }
    set endDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.endDate = this.string_to_date(s);
        }
    }
}
 // class IntervalViewModel
