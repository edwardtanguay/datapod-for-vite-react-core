import { DataType } from "./DataType";

export class DataTypeDecimal extends DataType {

	protected dataTypeIdCode = 'decimal';

	constructor(idCode:string) {
		super(idCode);
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}


}