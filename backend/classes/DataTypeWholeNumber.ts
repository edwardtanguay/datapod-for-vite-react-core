import { DataType } from "./DataType";

export class DataTypeWholeNumber extends DataType {

	protected dataTypeIdCode = 'wholeNumber';

	constructor(idCode:string) {
		super(idCode);
	}
	
	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

}