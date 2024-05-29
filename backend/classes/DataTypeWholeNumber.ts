import { DataType } from "./DataType";

export class DataTypeWholeNumber extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'wholeNumber';
		this.abbreviatedDataTypeIdCode = 'wn';
	}
	
	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

	
	protected getDefaultValue() {
		return 0;
	}

}