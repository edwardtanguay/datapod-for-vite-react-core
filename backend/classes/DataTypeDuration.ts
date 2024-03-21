import { DataType } from "./DataType";

export class DataTypeDuration extends DataType {

	protected dataTypeIdCode = 'duration';

	constructor(idCode:string) {
		super(idCode);
	}

}