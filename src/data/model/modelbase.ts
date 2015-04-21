//modelbase.ts
//
import {IElementDesc, IPerson,IDatabaseManager} from '../../infodata.d';
import {DataService} from '../services/dataservice';
import {UserInfo} from './userinfo';
//
declare var window:any;
//
export class BaseViewModel {
	//
	private _userinfo:UserInfo;
	private _dataService :IDatabaseManager;
	//
	public title:string;
	public errorMessage:string;
	public infoMessage:string;
	//
	constructor(){
			this._userinfo = null;
			this._dataService = null;
			this.infoMessage = null;
			this.errorMessage = null;
		}// constructor
  protected confirm(message:string) : boolean {
    return window.confirm(message);
  }  
  protected createUrl(blob:Blob) : string {
    let sRet:string = null;
    if ((blob !== undefined) && (blob !== null)){
       try {
         sRet = window.URL.createObjectURL(blob);
       } catch(e){
        console.log(e.toString());
       }
    }
    return sRet;
  }
  protected revokeUrl(s:string) : void {
    if ((s !== undefined) && (s !== null)){
      window.revokeObjectURL(s);
    }
  }
	public get userInfo(): UserInfo {
		if (this._userinfo === null){
			this._userinfo = new UserInfo();
		}
		return this._userinfo;
	}// userInfo
	public get dataService(): IDatabaseManager {
			if (this._dataService === null){
				this._dataService = new DataService();
			}
			return this._dataService;
		}	// dataService
	protected update_title() : void {
    } // update_title
  public get hasErrorMessage() : boolean {
    return (this.errorMessage !== null) && (this.errorMessage.length > 0);
  }
  public set hasErrorMessage(b:boolean){

  }
  public get hasInfoMessage() : boolean {
    return (this.infoMessage !== null) && (this.infoMessage.length > 0);
  }
  public set hasInfoMessage(b:boolean){
    
  }
  public clear_error() : void {
    this.errorMessage = null;
    this.hasInfoMessage = null;
  }
  public set_error(err:any) : void {
      if ((err !== undefined) && (err !== null)) {
        if ((err.message !== undefined) && (err.message !== null)) {
          this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
        } else if ((err.msg !== undefined) && (err.msg !== null)) {
          this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
        } else if ((err.reason !== undefined) && (err.reason !== null)) {
          this.errorMessage = err.reason;
        } else {
          this.errorMessage = JSON.stringify(err);
        }
      } else {
        this.errorMessage = 'Erreur inconnue...';
      }
    } // set_error
    public get isConnected() : boolean {
    	 let x = this.userInfo;
    	 return x.isConnected;
    	}// isConnected
    public get isNotConnected() : boolean {
    	return (!this.isConnected);
    }
    public disconnect() : void {
    	 if (this.confirm("Voulez-vous vraiment quitter?")){
    	 	this.userInfo.person = null;
    	 }
    	}// disconnect
     public get fullname(): string{
      return this.userInfo.fullname;
     } 
     public get photoUrl(): string {
      return this.userInfo.photoUrl;
     }
     public get hasPhoto():boolean {
      return this.userInfo.hasPhoto;
     }
     protected retrieve_one_avatar(item:IElementDesc) : Promise<IElementDesc> {
  let service = this.dataService;
  let self = this;
     return new Promise((resolve,reject) =>{
       let docid = item.avatardocid;
       let id = item.avatarid;
       item.url = null;
       if ((docid === null) || (id === null)){
        resolve(item);
       } else {
        service.find_attachment(docid,id).then((blob)=>{
          if ((blob === undefined) || (blob === null)){
            resolve(item);
          } else {
            let x = self.createUrl(blob);
            item.url = x;
            resolve(item);
          }
          },(err)=>{
          resolve(item);
          });
       }
      });
    }// retrieve_one_avatar
    protected retrieve_avatars(elems:IElementDesc[]) : Promise<IElementDesc[]>  {
    let pp = [];
    for (let elem of elems){
      pp.push(this.retrieve_one_avatar(elem));
    }
    return Promise.all(pp);
  }// retrieve_avatars
	}// class BaseViewModel