//
const upperBoundUpper = 'A'.charCodeAt(0);
const lowerBoundUpper = 'Z'.charCodeAt(0);
//
export class InfoRoot {
    //
    constructor() {
    } // constructor
    static check_name(s, bSpace) {
        let sRet = null;
        if ((s !== undefined) && (s !== null)) {
            let sx = s.trim().toLowerCase();
            let n = sx.length;
            sRet = '';
            let b = ((bSpace !== undefined) && (bSpace !== null)) ? bSpace : false;
            if (b) {
                for (let i = 0; i < n; ++i) {
                    let c = sx.charAt(i);
                    if (c != ' ') {
                        sRet = sRet + c;
                    }
                } // i
            }
            else {
                for (let i = 0; i < n; ++i) {
                    let c = sx.charCodeAt(i);
                    if ((c <= upperBoundUpper) && (c >= lowerBoundUpper)) {
                        sRet = sRet + sx.charAt(i);
                    }
                }
            }
            if (sRet.length < 1) {
                sRet = null;
            }
        } // s
        return sRet;
    } // check_name
    static create_random_id() {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        return sn;
    } // create_random_id
    static create_date_random_id(seed) {
        let sn = InfoRoot.create_random_id();
        let d = ((seed !== undefined) && (seed !== null)) ? seed : new Date();
        let s = d.toISOString() + '-' + sn;
        return s;
    } // create_date_random_id
    static sync_array(cont, id) {
        let pSel = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                } // x
            } // id
            if (pSel === null) {
                pSel = cont[0];
            }
        } // cont
        return pSel;
    } // sync_departements
    static add_id_to_array(cont, id) {
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0) &&
            (id !== undefined) && (id !== null)) {
            let bFound = false;
            for (let x of cont) {
                if (x == id) {
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                cont.push(id);
            }
        }
    } // add_id_to_array
    static string_to_date(s) {
        let dRet = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            }
            catch (e) {
            }
        }
        return dRet;
    }
    static date_to_string(d) {
        let sRet = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            }
            catch (e) { }
        }
        return sRet;
    }
    static number_to_string(n) {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    static string_to_number(s) {
        let dRet = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            }
            catch (e) { }
        } // s
        return dRet;
    }
    static confirm(message) {
        return window.confirm(message);
    }
    static createUrl(blob) {
        let sRet = null;
        if ((blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            }
            catch (e) {
                console.log(e.toString());
            }
        }
        return sRet;
    }
    static revokeUrl(s) {
        if ((s !== undefined) && (s !== null)) {
            try {
                window.URL.revokeObjectURL(s);
            }
            catch (e) { }
        }
    }
    static check_date(d) {
        return InfoRoot.string_to_date(d);
    } // check_date
    static check_number(s) {
        return InfoRoot.string_to_number(s);
    }
}
 // class InfoRoot
