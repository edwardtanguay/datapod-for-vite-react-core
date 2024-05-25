import { DataType } from "./DataType";

export class DataTypeUrl extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'url';
	}

}