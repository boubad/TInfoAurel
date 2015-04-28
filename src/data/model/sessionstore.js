export class SessionObjectStore {
    constructor() {
    }
    get_value(key) {
        let vRet = null;
        if ((key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                vRet = window.sessionStorage.getItem(skey);
                if ((vRet !== null) && (vRet == "null")) {
                    vRet = null;
                }
            }
        }
        return vRet;
    }
    store_value(key, value) {
        if ((key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                try {
                    if ((value !== undefined) && (value !== null)) {
                        window.sessionStorage.setItem(skey, value);
                    }
                    else if (window.sessionStorage.getItem(skey) !== null) {
                        window.sessionStorage.removeItem(skey);
                    }
                }
                catch (e) {
                    console.log('SessionObjectStore error: ' + e.toString());
                }
            }
        }
    }
    remove_value(key) {
        return this.store_value(key, null);
    }
}
