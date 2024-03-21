import { DataType } from "./DataType";

export class DataTypeKilometers extends DataType {

	protected dataTypeIdCode = 'kilometers';

	constructor(idCode:string) {
		super(idCode);
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}


}