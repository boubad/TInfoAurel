// pagedviewmodel.ts
//
import {IBaseItem, IElementDesc, IItemGenerator} from '../../../infodata.d';
//
import {BaseViewModel} from '../modelbase';

//
export class PagedViewModel extends BaseViewModel {
  //
  protected modelItem: IBaseItem;
  protected add_mode: boolean;
  protected old_elem: IBaseItem;
  protected _current: IBaseItem;
  protected _current_element: IBaseItem;
  protected itemsPerPage: number;
  protected hasAvatars: boolean;
  protected isDescending: boolean;
  //
  protected _all_ids: string[];
  protected pagesCount: number;
  protected currentPage: number;
  //
  public elements: IBaseItem[];
  //
  constructor(model: IBaseItem) {
    super();
    this.modelItem = model;
    this.add_mode = false;
    this.old_elem = null;
    this._current = this.generator.create_item({ type: model.type });
    this._current_element = null;
    this.itemsPerPage = 16;
    this.elements = [];
    this.hasAvatars = false;
    this.isDescending = false;
    //
    this._all_ids = [];
    this.pagesCount = 0;
    this.currentPage = 0;
  }// constructor
  public activate(): any {
    this.update_title();
    if (this.elements.length < 1) {
      return this.refreshAll();
    }
    return true;
  }// activate
  public get current_item(): IBaseItem {
    if ((this._current === undefined) || (this._current === null)) {
      this._current = this.create_item();
    }
    return this._current;
  }
  public set current_item(s: IBaseItem) {
    if ((s !== undefined) && (s !== null)) {
      this._current = s;
    } else {
      this._current = this.create_item();
    }
    this.post_change_item();
  }
  protected create_item(): IBaseItem {
    let model = this.modelItem;
    let p = this.generator.create_item({ type: model.type });
    return p;
  }// create_item
  public addNew(): void {
    this.old_elem = this.current_element;
    this.current_element = null;
    this.change_current();
    this.add_mode = true;
  }// addNew
  public cancel_add(): void {
    this.current_element = this.old_elem;
    this.add_mode = false;
  }// cancel_add
  protected change_current(): any {
    this.add_mode = false;
    let ep = this.current_element;
    if (ep === null) {
      this.current_item = this.create_item();
      return true;
    }
    let id = ((ep.id !== undefined) && (ep.id !== null)) ? ep.id : null;
    if (id === null) {
      this.current_item = this.create_item();
      return true;
    }
    var self = this;
    return this.dataService.find_item_by_id(id, true).then((r) => {
      self.current_item = ((r !== undefined) && (r !== null)) ? r : this.create_item();;
    }, (err) => {
        self.current_item = this.create_item();;
      });
  }// change_current
  protected post_change_item(): any {
    return true;
  }// post_change_item
  public get current_element(): IBaseItem {
    return this._current_element;
  }
  public set current_element(s: IBaseItem) {
    this._current_element = ((s !== undefined) && (s !== null)) ? s : null;
    this.change_current();
  }
  protected create_start_key(): any {
    return this.modelItem.start_key;
  }
  public get hasElements(): boolean {
    return ((this.elements !== null) && (this.elements.length > 0));
  }
  public set hasElements(b: boolean) {

  }
  public get canAdd(): boolean {
    return (!this.add_mode);
  }
  public set canAdd(s: boolean) {

  }
  public get canCancel(): boolean {
    return this.add_mode;
  }
  public set canCancel(s: boolean) {

  }
  public get canRemove(): boolean {
    let x = this.current_element;
    return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
      (x.id !== null) && (x.rev !== null));
  }
  public set canRemove(s: boolean) {

  }
  public remove(): any {
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
  }// remove
  public get canSave(): boolean {
    let x = this.current_item;
    return (x !== null) && (x.is_storeable !== undefined) && (x.is_storeable() == true);
  }
  public set canSave(s: boolean) {

  }
  public save(): any {
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
        self.refresh();
      } else {
        self.refreshAll();
      }
    }, (err) => {
        self.add_mode = false;
        self.set_error(err);
      });
  }// save
  public refresh(): any {
    for (let elem of this.elements) {
      let x = elem.url;
      if (x !== null) {
        this.revokeUrl(x);
        elem.url = null;
      }
    }// elem
    let startKey = null;
    let endKey = null;
    let nbItems = this._all_ids.length;
    let istart = this.currentPage * this.itemsPerPage;
    if (istart < 0){
      istart = 0;
    }
    if ((istart >= 0) && (istart < nbItems)){
      startKey = this._all_ids[istart];
    }
    let iend = istart + this.itemsPerPage - 1;
    if (iend >= nbItems){
      iend = nbItems - 1;
    }
    if ((iend >= 0) && (iend < nbItems)){
      endKey = this._all_ids[iend];
    }
    if ((startKey === null) || (endKey === null)){
      this.elements = [];
      this.current_element = null;
      return true;
    }
    let model = this.modelItem;
    this.clear_error();
    let oldid = (this.current_item !== null) ? this.current_item.id : null;
    var self = this;
    return this.dataService.get_items(model, startKey,endKey).then((rr) => {
      if (self.hasAvatars) {
      		return self.retrieve_avatars(rr);
      } else {
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
          }// i
        }// old
        self.current_element = pSel;
        if (dd.length < 1) {
          self.addNew();
        }
      } else {
        self.elements = [];
        self.addNew();
      }
    });
  }// refresh
  public refreshAll(): any {
    this._all_ids = [];
    this.pagesCount = 0;
    this.currentPage = 0;
    let model = this.modelItem;
    let startKey = model.start_key;
    let endKey = model.end_key;
    let nc = this.itemsPerPage;
    let self = this;
    return this.dataService.get_ids(startKey, endKey).then((ids) => { 
      if ((ids !== undefined) && (ids !== null)){
        self._all_ids = ids;
        let nt = ids.length;
        let np = Math.floor(nt / nc);
        if ((np * nc) < nt){
          ++np;
        }
        self.pagesCount = np;
      }
      return self.refresh();
      });
  }
  public get canPrevPage(): boolean {
    return (this.currentPage > 0);
  }
  public set canPrevPage(b: boolean) {

  }
  public get canNextPage(): boolean {
    let n = this.pagesCount - 1;
    return (this.currentPage >= 0) && (this.currentPage < n);
  }
  public set canNextPage(b: boolean) {
  }
  public nextPage(): any {
    let n = this.pagesCount - 1;
    if (this.currentPage < n){
       this.currentPage = this.currentPage + 1;
       return this.refresh();
    }
    return true;
  }// nextPage
  public prevPage(): any {
    if (this.currentPage > 0){
      this.currentPage = this.currentPage + 1;
      return this.refresh();
    }
    return true;
  }// prevPage
  public firstPage() : any {
    this.currentPage = 0;
    return this.refresh();
  }
  public lastPage() : any {
    let n = this.pagesCount - 1;
    if (n >= 0){
      this.currentPage = n;
      return this.refresh();
    }
    return true;
  }
  public get hasPages(): boolean {
    return (this.pagesCount > 1);
  }
  public set hasPages(b: boolean) {
  }
  
}// class ItemBase