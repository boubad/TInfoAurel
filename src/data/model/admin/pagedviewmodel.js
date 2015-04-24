import { BaseViewModel } from '../modelbase';
//
export class PagedViewModel extends BaseViewModel {
    //
    constructor(model) {
        super();
        this.modelItem = model;
        this.add_mode = false;
        this.old_elem = null;
        this._current = null;
        this.itemsPerPage = 16;
        this.elements = [];
        this.hasAvatars = false;
        this.hasAttachments = false;
        this._pagesize = 16;
        //
        this._all_ids = [];
        this.pagesCount = 0;
        this._currentPage = 0;
    } // constructor
    canActivate() {
        return this.isSuper || this.isAdmin;
    }
    activate() {
        this.update_title();
        if (this.elements.length < 1) {
            return this.refreshAll();
        }
        return true;
    } // activate
    get itemsPerPage() {
        if ((this._pagesize === undefined) || (this._pagesize === null)) {
            this._pagesize = 16;
        }
        if (this._pagesize < 1) {
            this._pagesize = 1;
        }
        return this._pagesize;
    }
    set itemsPerPage(s) {
        if ((s !== undefined) && (s !== null) && (s > 0)) {
            let old = this._pagesize;
            if (old != s) {
                this._pagesize = s;
                this.refreshAll();
            }
        }
    }
    get currentPage() {
        if ((this._currentPage === undefined) || (this._currentPage === null)) {
            this._currentPage = 0;
        }
        return this._currentPage;
    }
    set currentPage(s) {
        if ((s !== undefined) && (s !== null) && (s >= 0) && (s < this.pagesCount)) {
            let old = this._currentPage;
            if (old != s) {
                this._currentPage = s;
                this.refresh();
            }
        }
    }
    get current_item() {
        if ((this._current === undefined) || (this._current === null)) {
            this._current = this.create_item();
        }
        return this._current;
    }
    set current_item(s) {
        if ((s !== undefined) && (s !== null)) {
            this._current = s;
        }
        else {
            this._current = this.create_item();
        }
        this.post_change_item();
    }
    create_item() {
        let model = this.modelItem;
        let p = this.generator.create_item({ type: model.type });
        return p;
    } // create_item
    addNew() {
        this.old_elem = this.current_item;
        this.current_item = null;
        this.add_mode = true;
    } // addNew
    cancel_add() {
        this.current_item = this.old_elem;
        this.add_mode = false;
    } // cancel_add
    post_change_item() {
        return true;
    } // post_change_item
    get current_element() {
        if ((this._current === undefined) || (this._current === null)) {
            this._current = this.create_item();
        }
        return this._current;
    }
    set current_element(s) {
        if ((s !== undefined) && (s !== null)) {
            this._current = s;
        }
        else {
            this._current = this.create_item();
        }
        this.post_change_item();
    }
    create_start_key() {
        return this.modelItem.start_key;
    }
    get hasElements() {
        return ((this.elements !== null) && (this.elements.length > 0));
    }
    set hasElements(b) {
    }
    get canAdd() {
        return (!this.add_mode);
    }
    set canAdd(s) {
    }
    get canCancel() {
        return this.add_mode;
    }
    set canCancel(s) { }
    get canRemove() {
        let x = this.current_item;
        return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
            (x.id !== null) && (x.rev !== null));
    }
    set canRemove(s) { }
    remove() {
        let item = this.current_item;
        if (item === null) {
            return false;
        }
        if (item.id === null) {
            return false;
        }
        if (this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            let self = this;
            return this.dataService.remove_item(item).then((r) => {
                self.refreshAll();
            }, (err) => {
                self.set_error(err);
            });
        }
    } // remove
    get canSave() {
        let x = this.current_item;
        return (x !== null) && (x.is_storeable !== undefined) && (x.is_storeable() == true);
    }
    set canSave(s) { }
    save() {
        let item = this.current_item;
        if (item === null) {
            return false;
        }
        if (!item.is_storeable()) {
            return false;
        }
        var self = this;
        return this.dataService.maintains_item(item).then((r) => {
            if (item.rev !== null) {
                self.add_mode = false;
                return self.refresh();
            }
            else {
                return self.refreshAll();
            }
        }, (err) => {
            self.add_mode = false;
            self.set_error(err);
            return false;
        });
    } // save
    refresh() {
        for (let elem of this.elements) {
            let x = elem.url;
            if (x !== null) {
                this.revokeUrl(x);
                elem.url = null;
            }
        } // elem
        let startKey = null;
        let endKey = null;
        let nbItems = this._all_ids.length;
        let istart = this.currentPage * this.itemsPerPage;
        if ((istart >= 0) && (istart < nbItems)) {
            startKey = this._all_ids[istart];
        }
        let iend = istart + this.itemsPerPage - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend >= 0) && (iend < nbItems)) {
            endKey = this._all_ids[iend];
        }
        if ((startKey === null) || (endKey === null)) {
            this.elements = [];
            this.current_item = null;
            return true;
        }
        let model = this.modelItem;
        this.clear_error();
        let oldid = (this.current_item !== null) ? this.current_item.id : null;
        var self = this;
        return this.dataService.get_items(model, startKey, endKey).then((rr) => {
            if (self.hasAvatars) {
                return self.retrieve_avatars(rr);
            }
            else {
                return rr;
            }
        }).then((dd) => {
            if ((dd !== undefined) && (dd !== null)) {
                self.elements = dd;
                let pSel = null;
                if (oldid !== null) {
                    let n = dd.length;
                    for (let i = 0; i < n; ++i) {
                        let x = dd[i];
                        if (x.id == oldid) {
                            pSel = x;
                            break;
                        }
                    } // i
                } // old
                self.current_element = pSel;
                if (dd.length < 1) {
                    self.addNew();
                }
            }
            else {
                self.elements = [];
                self.addNew();
            }
            return true;
        });
    } // refresh
    refreshAll() {
        this._all_ids = [];
        this.pagesCount = 0;
        this._currentPage = 0;
        let model = this.modelItem;
        let startKey = model.start_key;
        let endKey = model.end_key;
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.get_ids(startKey, endKey).then((ids) => {
            if ((ids !== undefined) && (ids !== null)) {
                self._all_ids = ids;
                let nt = ids.length;
                let np = Math.floor(nt / nc);
                if ((np * nc) < nt) {
                    ++np;
                }
                self.pagesCount = np;
            }
            return self.refresh();
        });
    }
    get canPrevPage() {
        return (this.currentPage > 0);
    }
    set canPrevPage(b) { }
    get canNextPage() {
        let n = this.pagesCount - 1;
        return (this.currentPage >= 0) && (this.currentPage < n);
    }
    set canNextPage(b) { }
    nextPage() {
        let n = this.pagesCount - 1;
        if (this.currentPage < n) {
            this.currentPage = this.currentPage + 1;
        }
        return true;
    } // nextPage
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage = this.currentPage + 1;
        }
        return true;
    } // prevPage
    firstPage() {
        this.currentPage = 0;
    }
    lastPage() {
        let n = this.pagesCount - 1;
        if (n >= 0) {
            this.currentPage = n;
        }
        return true;
    }
    get hasPages() {
        return (this.pagesCount > 1);
    }
    set hasPages(b) { }
    get description() {
        let x = this.current_item;
        return ((x !== undefined) && (x !== null)) ? x.description : null;
    }
    set description(s) {
        let x = this.current_item;
        if ((x !== undefined) && (x !== null)) {
            x.description = s;
        }
    }
}
 // class ItemBase
