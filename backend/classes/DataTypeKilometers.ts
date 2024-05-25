import { DataType } from "./DataType";

export class DataTypeKilometers extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'kilometers';
		this.abbreviatedDataTypeIdCode = 'km';
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

}