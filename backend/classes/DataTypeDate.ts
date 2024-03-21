import { DataType } from "./DataType";

export class DataTypeDate extends DataType {

	protected dataTypeIdCode = 'date';

	constructor(idCode:string) {
		super(idCode);
	}

}