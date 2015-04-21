// pagedviewmodel.ts
//
import {IBaseItem,IElementDesc,IItemGenerator} from '../../../infodata.d';
//
import {BaseViewModel} from '../modelbase';
import {ItemGenerator} from '../../domain/itemgenerator';
//
export class PagedViewModel extends BaseViewModel {
	//
	protected modelItem:IBaseItem;
	protected generator:IItemGenerator;
	protected add_mode:boolean;
	protected old_elem:IElementDesc;
	protected _current:IBaseItem;
	protected _current_element:IElementDesc;
	protected next_key:any;
	protected prev_key:any;
	protected start_key:any;
	protected first_key:any;
	protected itemsPerPage:number;
	protected skip:number;
	protected hasAvatars:boolean;
	//
	public elements:IElementDesc[];
	//
	constructor(model:IBaseItem){
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
	}// constructor
	public activate() : any {
    this.update_title();
    if (this.elements.length < 1){
			return this.refreshAll();
		}
		return true;
  }// activate
  public get current_item(): IBaseItem{
    if ((this._current === undefined) || (this._current === null)){
       this._current = this.create_item();
    }
    return this._current;
  }
  public set current_item(s:IBaseItem){
    if ((s !== undefined) && (s !== null)){
      this._current = s;
    } else {
       this._current = this.create_item();
    }
     this.post_change_item();
  }
protected create_item(): IBaseItem {
    if (this.generator === null){
      this.generator = new ItemGenerator();
    }
    let model = this.modelItem;
    let p = this.generator.create_item({type: model.type});
	return p;
	}// create_item
public addNew() : void {
		this.old_elem = this.current_element;
		this.current_element = null;
		this.add_mode = true;
	}// addNew
public cancel_add(): void {
		this.current_element = this.old_elem;
		this.add_mode = false;
	}// cancel_add
protected change_current() : any {
		let ep = this.current_element;
		if (ep === null){
			this.current_item = null;
			return true;
		}
		let id = ((ep.id !== undefined) && (ep.id !== null)) ? ep.id : null;
		if (id === null){
			this.current_item = null;
			return true;
		}
		var self = this;
		return this.dataService.find_item_by_id(id,true).then((r)=>{
			self.current_item = ((r !== undefined) && (r !== null)) ? r : null;
		},(err)=>{
			self.current_item = null;
		});
	}// change_current
  protected post_change_item() : any {
    return true;
  }// post_change_item
  public get current_element(): IElementDesc{
    return this._current_element;
  }
  public set current_element(s:IElementDesc){
    this._current_element = ((s !== undefined) && (s !== null)) ? s : null;
    this.change_current();
  }
  protected create_start_key() : any {
	 return this.modelItem.start_key;
	}
  public get hasElements(): boolean {
    return ((this.elements !== null) && (this.elements.length > 0));
  }
 public get canAdd(): boolean {
		return (!this.add_mode);
	}
public get canCancel(): boolean {
		return this.add_mode;
	}
public get canRemove(): boolean {
		let x = this.current_element;
		return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
			(x.id !== null) && (x.rev !== null));
	}
public remove() : any {
		let item = this.current_item;
		if (item === null){
			return false;
		}
		if (item.id === null){
			return false;
		}
		if (this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')){
			let self = this;
		return this.dataService.remove_item(item).then((r)=>{
			self.refreshAll();
		},(err)=>{
			self.set_error(err);
		});
		}
	}// remove
	public get canSave(): boolean {
		let x = this.current_item;
		return (x !== null) && (x.is_storeable !== undefined) && (x.is_storeable() == true);
	}
	public save(): any {
		let item = this.current_item;
		if (item === null){
			return false;
		}
		if (!item.is_storeable){
			return false;
		}
		var self = this;
		return this.dataService.maintains_item(item).then((r)=>{
			if (item.rev !== null){
				self.refresh();
			} else {
				self.refreshAll();
			}
		},(err)=>{
			self.set_error(err);
		});
	}// save
  public refresh() : any {
  	for (let elem of this.elements){
  		 let x = elem.url;
  		 if (x !== null){
  		 	this.revokeUrl(x);
  		 	elem.url = null;
  		 }
  	}// elem
    let limit  = this.itemsPerPage;
    let skip = this.skip;
    let startKey = this.start_key;
    if (startKey === null){
      startKey = this.create_start_key();
    }
    let descending = null;
    let bAttach = null;
    let model = this.modelItem;
    this.clear_error();
    let oldid = (this.current_item !== null) ? this.current_item.id : null;
    var self = this;
    let viewName = model.index_name;
    return this.dataService.find_elements(viewName,startKey,
      skip,limit,descending).then((rr)=>{
      	if (self.hasAvatars){
      		return self.retrieve_avatars(rr);
      	} else {
      		return rr;
      	}
      	}).then((dd)=>{
      		if ((dd !== undefined) && (dd !== null)){
        self.prev_key = startKey;
        if (self.start_key === null){
        	self.canPrevPage = false;
        }
        let n = dd.length;
        if (n < limit){
          self.next_key = null;
          self.canNextPage = false;
        } else  if (n > 0) {
          self.skip = 0;
          let y = dd[0];
          self.prev_key = y.key;
          let x = dd[ n - 1];
          self.next_key = x.key;
          self.canNextPage = true;
        }
        self.elements = dd;
        let pSel  = null;
        if (oldid !== null){
          let n = dd.length;
          for (let i = 0; i < n; ++i){
            let x = dd[i];
            if (x.id == oldid){
              pSel = x;
              break;
            }
          }// i
        }// old
        self.current_element = pSel;
        if (dd.length < 1){
           self.addNew();
        }
      } else {
        self.elements = [];
        self.addNew();
      }
      		});
  }// refresh
public  refreshAll(): any {
  	this.skip = 0;
    this.prev_key = null;
  	this.start_key = null;
    this.next_key = null;
  	return this.refresh();
  }
 public nextPage() : any {
  	if (this.next_key !== null){
  		this.skip = 1;
  		this.start_key = this.next_key;
  		return this.refresh();
  	}
  }// nextPage
  public prevPage() : any {
  	if (this.prev_key !== null){
  		this.skip = 0;
  		this.start_key = this.prev_key;
  		this.refresh();
  	}
  }// prevPage
  public get hasPages() : boolean {
    return (this.next_key !== null) || (this.prev_key !== null);
  }
  public set hasPages(b:boolean){

  }
  public get canPrevPage(): boolean{
    return (this.prev_key !== null);
  }
  public set canPrevPage(b:boolean){

  }
  public get canNextPage() : boolean {
    return (this.next_key !== null);
  }
  public set canNextPage(b:boolean){

  }
}// class ItemBase