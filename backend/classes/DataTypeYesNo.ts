import { DataType } from "./DataType";

export class DataTypeYesNo extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'yesNo';
		this.abbreviatedDataTypeIdCode = 'yn';
	}
	
}