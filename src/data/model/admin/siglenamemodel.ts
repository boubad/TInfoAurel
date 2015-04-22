//siglenamemodel.ts
import {IBaseItem} from '../../../infodata.d';
//
import {PagedViewModel} from './pagedviewmodel';
//
export class SigleNameModel extends PagedViewModel {
	constructor(model:IBaseItem){
		super(model);
	}
	public get sigle(): string {
		let x = this.current_item;
		return ((x !== undefined) && (x !== null)) ? x.sigle : null;
	}
	public set sigle(s:string){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.sigle = s;
		}
	}
	public get name(): string{
		let x = this.current_item;
		return ((x !== undefined) && (x !== null)) ? x.name : null;
	}
	public set name(s:string){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.name = s;
		}
	}
	public get description(): string{
		let x = this.current_item;
		return ((x !== undefined) && (x !== null)) ? x.description : null;
	}
	public set description(s:string){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.description = s;
		}
	}
}// class SigleNameBase