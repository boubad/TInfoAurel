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
        if (d === null) {
            return null;
        }
        let t = Date.parse(d.toString());
        if (isNaN(t)) {
            return null;
        }
        let dt = new Date(t);
        return dt.toISOString().substr(0, 10);
    }
    set startDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            let t = Date.parse(s);
            let d = (isNaN(t)) ? null : new Date(t);
            x.startDate = d;
        }
    }
    get endDate() {
        let x = this.current_item;
        let d = ((x !== undefined) && (x !== null)) ? x.endDate : null;
        if (d === null) {
            return null;
        }
        let t = Date.parse(d.toString());
        if (isNaN(t)) {
            return null;
        }
        let dt = new Date(t);
        return dt.toISOString().substr(0, 10);
    }
    set endDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            let t = Date.parse(s);
            let d = (isNaN(t)) ? null : new Date(t);
            x.endDate = d;
        }
    }
}
 // class IntervalViewModel
