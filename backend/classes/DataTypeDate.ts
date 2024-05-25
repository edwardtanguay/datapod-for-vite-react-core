import { DataType } from "./DataType";

export class DataTypeDate extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'date';
	}


}