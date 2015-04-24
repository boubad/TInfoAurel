import { PagedViewModel } from './pagedviewmodel';
//
export class SigleNameModel extends PagedViewModel {
    constructor(model) {
        super(model);
    }
    get sigle() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.sigle : null;
    }
    set sigle(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.sigle = s;
        }
    }
    get name() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.name : null;
    }
    set name(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.name = s;
        }
    }
}
 // class SigleNameBase
