//sessionstore.ts
//
import {IObjectStore} from '../../infodata.d';
//
export class SessionObjectStore implements IObjectStore {
    constructor() {
    }// constructor
    public get_value(key: string): string {
        let vRet = null;
        if ((key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                vRet = window.sessionStorage.getItem(skey);
                if ((vRet !== null) && (vRet == "null")) {
                    vRet = null;
                }
            }// skey
        }// exists
        return vRet;
    }// get_value
    public store_value(key: string, value: string): any {
        if ((key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                try {
                    if ((value !== undefined) && (value !== null)) {
                        window.sessionStorage.setItem(skey, value);
                    } else if (window.sessionStorage.getItem(skey) !== null) {
                        window.sessionStorage.removeItem(skey);
                    }

                } catch (e) {
                    console.log('SessionObjectStore error: ' + e.toString());
                }
            }// skey
        }// exists
    }// store_value
    public remove_value(key: string): any {
        return this.store_value(key, null);
    }// remove_value
}// class SessionObjectStore