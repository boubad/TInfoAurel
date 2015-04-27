// pagedviewmodel.ts
//
import {IBaseItem, IItemGenerator} from '../../../infodata.d';
//
import {BaseViewModel} from '../modelbase';

//
export class PagedViewModel extends BaseViewModel {
  //
  protected modelItem: IBaseItem;
  protected add_mode: boolean;
  protected old_elem: IBaseItem;
  protected _current: IBaseItem;
  protected hasAvatars: boolean;
  protected hasAttachments: boolean;
  protected _pagesize: number;
  //
  protected _all_ids: string[];
  protected pagesCount: number;
  protected _currentPage: number;
  //
  public elements: IBaseItem[];
  //
  constructor(model: IBaseItem) {
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
  }// constructor
  public canActivate(): any {
    return this.isSuper || this.isAdmin;
  }
  public activate(params?:any,queryString?:any,routeConfig?:any) : any {
    let self = this;
    return super.activate(params,queryString,routeConfig).then((r)=>{
        if (self.elements.length < 1){
          return self.refreshAll();
        } else {
          return true;
        }
      });
  }// activate
  public get itemsPerPage() : number{
    if ((this._pagesize === undefined) || (this._pagesize === null)){
      this._pagesize = 16;
    }
    if (this._pagesize < 1){
      this._pagesize = 1;
    }
    return this._pagesize;
  }
  public set itemsPerPage(s:number){
    if ((s !== undefined) && (s !== null) && (s > 0)){
      let old = this._pagesize;
      if (old != s){
        this._pagesize = s;
        this.refreshAll();
      }
    }
  }
  public get currentPage():number {
    if ((this._currentPage === undefined) || (this._currentPage === null)){
      this._currentPage = 0;
    }
    return this._currentPage;
  }
  public set currentPage(s:number){
    if ((s !== undefined) && (s !== null) && (s >= 0) && (s < this.pagesCount)){
      let old = this._currentPage;
      if (old != s) {
        this._currentPage = s;
        this.refresh();
      }
    }
  }
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
    this.add_mode = false;
    this.post_change_item();
  }
  protected create_item(): IBaseItem {
    let model = this.modelItem;
    let p = this.generator.create_item({ type: model.type });
    return p;
  }// create_item
  public addNew(): void {
    this.old_elem = this.current_item;
    this.current_item = null;
    this.add_mode = true;
  }// addNew
  public cancel_add(): void {
    this.current_item = this.old_elem;
    this.add_mode = false;
  }// cancel_add
  protected post_change_item(): any {
    return true;
  }// post_change_item
  public get current_element(): IBaseItem {
     if ((this._current === undefined) || (this._current === null)) {
      this._current = this.create_item();
    }
    return this._current;
  }
  public set current_element(s: IBaseItem) {
    if ((s !== undefined) && (s !== null)) {
      this._current = s;
    } else {
      this._current = this.create_item();
    }
    this.post_change_item();
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
  public set canCancel(s: boolean) {}

  public get canRemove(): boolean {
    let x = this.current_item;
    return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
      (x.id !== null) && (x.rev !== null));
  }
  public set canRemove(s: boolean) {}
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
  public set canSave(s: boolean) {}
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
        return self.refresh();
      } else {
        return self.refreshAll();
      }
    }, (err) => {
        self.add_mode = false;
        self.set_error(err);
        return false;
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
      this.current_item = null;
      return true;
    }
    let model = this.modelItem;
    this.clear_error();
    let oldid = (this.current_item !== null) ? this.current_item.id : null;
    var self = this;
    return this.dataService.get_items(model, startKey,endKey).then((rr) => {
      self.add_mode = false;
      if (self.hasAvatars) {
      		return self.retrieve_avatars(rr);
      } else {
      		return rr;
      }
    }).then((dd) => {
      let pSel = null;
      self.elements = [];
      if ((dd !== undefined) && (dd !== null)) {
          self.elements = dd;
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
      } 
      self.current_element = pSel;
      if (self.elements.length < 1){
        self.addNew();
      }
      return true;
    });
  }// refresh
  public refreshAll(): any {
    this._all_ids = [];
    this.pagesCount = 0;
    this._currentPage = 0;
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
      self.update_title();
      return self.refresh();
      });
  }
  public get canPrevPage(): boolean {
    return (this.currentPage > 0);
  }
  public set canPrevPage(b: boolean) {}
  public get canNextPage(): boolean {
    let n = this.pagesCount - 1;
    return (this.currentPage >= 0) && (this.currentPage < n);
  }
  public set canNextPage(b: boolean) {}
  public nextPage(): any {
    let n = this.pagesCount - 1;
    if (this.currentPage < n){
       this.currentPage = this.currentPage + 1;
    }
    return true;
  }// nextPage
  public prevPage(): any {
    if (this.currentPage > 0){
      this.currentPage = this.currentPage + 1;
    }
    return true;
  }// prevPage
  public firstPage() : any {
    this.currentPage = 0;
  }
  public lastPage() : any {
    let n = this.pagesCount - 1;
    if (n >= 0){
      this.currentPage = n;
    }
    return true;
  }
  public get hasPages(): boolean {
    return (this.pagesCount > 1);
  }
  public set hasPages(b: boolean) {}
  public get description():string {
    let x = this.current_item;
    return ((x !== undefined) && (x !== null)) ? x.description : null;
  }
  public set description(s:string){
    let x = this.current_item;
    if ((x !== undefined) && (x !== null)){
        x.description = s;
    }
  }
}// class ItemBase