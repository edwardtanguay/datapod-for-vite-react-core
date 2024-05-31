import { DataType } from "./DataType";
// import * as qstr from '../../share/qtools/qstr';

export class DataTypeDpodId extends DataType {

	protected dataTypeIdCode = 'dpodId';

	constructor(idCode:string) {
		super(idCode);
		// this.value = qstr.generateShortUUID(); 
	}

}