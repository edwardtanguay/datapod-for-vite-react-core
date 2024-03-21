import { DataType } from "./DataType";

export class DataTypeUrl extends DataType {

	protected dataTypeIdCode = 'url';

	constructor(idCode:string) {
		super(idCode);
	}

}