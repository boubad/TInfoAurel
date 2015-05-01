import { DepSigleNameModel } from './depsiglenamemodel';
import { InfoRoot } from '../../inforoot';
export class IntervalViewModel extends DepSigleNameModel {
    constructor(model) {
        super(model);
    }
    get startDate() {
        let x = this.current_item;
        let d = ((x !== undefined) && (x !== null)) ? x.startDate : null;
        return InfoRoot.date_to_string(d);
    }
    set startDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.startDate = InfoRoot.string_to_date(s);
        }
    }
    get endDate() {
        let x = this.current_item;
        let d = ((x !== undefined) && (x !== null)) ? x.endDate : null;
        return InfoRoot.date_to_string(d);
    }
    set endDate(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.endDate = InfoRoot.string_to_date(s);
        }
    }
}
