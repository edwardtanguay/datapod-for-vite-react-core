import { DataType } from "./DataType";
import * as qstr from "../../share/qtools/qstr.js";

export class DataTypeWholeNumber extends DataType {

	protected dataTypeIdCode = 'wholeNumber';

	constructor(idCode:string) {
		super(idCode);
	}
	
	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

	public getSchemaLine(): string {
		return `${qstr.forceTitleNotation(this.idCode)};wn`;
	}

}