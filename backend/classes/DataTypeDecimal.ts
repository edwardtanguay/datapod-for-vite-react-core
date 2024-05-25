import { DataType } from "./DataType";

export class DataTypeDecimal extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'decimal';
		this.abbreviatedDataTypeIdCode = 'dec';
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}


}