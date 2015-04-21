import { BaseViewModel } from '../modelbase';
import { ItemGenerator } from '../../domain/itemgenerator';
//
export class PagedViewModel extends BaseViewModel {
    //
    constructor(model) {
        super();
        this.modelItem = model;
        this.generator = null;
        this.add_mode = false;
        this.old_elem = null;
        this._current = null;
        this._current_element = null;
        this.next_key = null;
        this.prev_key = null;
        this.start_key = null;
        this.itemsPerPage = 16;
        this.first_key = null;
        this.elements = [];
        this.skip = 0;
        this.hasAvatars = false;
    } // constructor
    activate() {
        this.update_title();
        if (this.elements.length < 1) {
            return this.refreshAll();
        }
        return true;
    } // activate
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
        if (this.generator === null) {
            this.generator = new ItemGenerator();
        }
        let model = this.modelItem;
        let p = this.generator.create_item({ type: model.type });
        return p;
    } // create_item
    addNew() {
        this.old_elem = this.current_element;
        this.current_element = null;
        this.add_mode = true;
    } // addNew
    cancel_add() {
        this.current_element = this.old_elem;
        this.add_mode = false;
    } // cancel_add
    change_current() {
        let ep = this.current_element;
        if (ep === null) {
            this.current_item = null;
            return true;
        }
        let id = ((ep.id !== undefined) && (ep.id !== null)) ? ep.id : null;
        if (id === null) {
            this.current_item = null;
            return true;
        }
        var self = this;
        return this.dataService.find_item_by_id(id, true).then((r) => {
            self.current_item = ((r !== undefined) && (r !== null)) ? r : null;
        }, (err) => {
            self.current_item = null;
        });
    } // change_current
    post_change_item() {
        return true;
    } // post_change_item
    get current_element() {
        return this._current_element;
    }
    set current_element(s) {
        this._current_element = ((s !== undefined) && (s !== null)) ? s : null;
        this.change_current();
    }
    create_start_key() {
        return this.modelItem.start_key;
    }
    get hasElements() {
        return ((this.elements !== null) && (this.elements.length > 0));
    }
    get canAdd() {
        return (!this.add_mode);
    }
    get canCancel() {
        return this.add_mode;
    }
    get canRemove() {
        let x = this.current_element;
        return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
            (x.id !== null) && (x.rev !== null));
    }
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
    save() {
        let item = this.current_item;
        if (item === null) {
            return false;
        }
        if (!item.is_storeable) {
            return false;
        }
        var self = this;
        return this.dataService.maintains_item(item).then((r) => {
            if (item.rev !== null) {
                self.refresh();
            }
            else {
                self.refreshAll();
            }
        }, (err) => {
            self.set_error(err);
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
        let limit = this.itemsPerPage;
        let skip = this.skip;
        let startKey = this.start_key;
        if (startKey === null) {
            startKey = this.create_start_key();
        }
        let descending = null;
        let bAttach = null;
        let model = this.modelItem;
        this.clear_error();
        let oldid = (this.current_item !== null) ? this.current_item.id : null;
        var self = this;
        let viewName = model.index_name;
        return this.dataService.find_elements(viewName, startKey, skip, limit, descending).then((rr) => {
            if (self.hasAvatars) {
                return self.retrieve_avatars(rr);
            }
            else {
                return rr;
            }
        }).then((dd) => {
            if ((dd !== undefined) && (dd !== null)) {
                self.prev_key = startKey;
                if (self.start_key === null) {
                    self.canPrevPage = false;
                }
                let n = dd.length;
                if (n < limit) {
                    self.next_key = null;
                    self.canNextPage = false;
                }
                else if (n > 0) {
                    self.skip = 0;
                    let y = dd[0];
                    self.prev_key = y.key;
                    let x = dd[n - 1];
                    self.next_key = x.key;
                    self.canNextPage = true;
                }
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
        });
    } // refresh
    refreshAll() {
        this.skip = 0;
        this.prev_key = null;
        this.start_key = null;
        this.next_key = null;
        return this.refresh();
    }
    nextPage() {
        if (this.next_key !== null) {
            this.skip = 1;
            this.start_key = this.next_key;
            return this.refresh();
        }
    } // nextPage
    prevPage() {
        if (this.prev_key !== null) {
            this.skip = 0;
            this.start_key = this.prev_key;
            this.refresh();
        }
    } // prevPage
    get hasPages() {
        return (this.next_key !== null) || (this.prev_key !== null);
    }
    set hasPages(b) {
    }
    get canPrevPage() {
        return (this.prev_key !== null);
    }
    set canPrevPage(b) {
    }
    get canNextPage() {
        return (this.next_key !== null);
    }
    set canNextPage(b) {
    }
}
 // class ItemBase
