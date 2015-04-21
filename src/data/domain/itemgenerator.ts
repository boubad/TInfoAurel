//itemgenerator.ts
//
import {IBaseItem,IItemGenerator} from '../../infodata.d';
//
import {BaseItem} from './baseitem';
import {Person} from './person';
import {Departement} from './departement';
//
export class ItemGenerator implements IItemGenerator {
	constructor(){}
	public create_item(oMap?:any) : IBaseItem {
		 if ((oMap === undefined) || (oMap === null)){
		 	return null;
		 }
		 if ((oMap.type === undefined) || (oMap.type === null)){
		 	return null;
		 }
           let t = oMap.type.trim().toLowerCase();
           if (t == 'person'){
               return new Person(oMap);
           } else if (t == 'departement'){
            return new Departement(oMap);
           }
		 return null;
		}// create_item
     public convert_items(docs:any[]) : IBaseItem[]{
     		let oRet:IBaseItem[] = [];
     		if ((docs !== undefined) && (docs !== null)){
     			 for (let doc of docs){
     			 		let xx = this.create_item(doc);
     			 		if (xx !== null){
     			 			oRet.push(xx);
     			 		}
     			 	}// doc
     			}// docs
     			if (oRet.length > 1){
     				let func = (oRet[0]).sort_func;
     				oRet.sort(func);
     			}
     			return oRet;
     	}// convert_items
}// class ItemGenerator
