import { DataType } from "./DataType";
import * as qstr from '../../share/qtools/qstr';

export class DataTypeKilometers extends DataType {

	protected dataTypeIdCode = 'kilometers';

	constructor(idCode:string) {
		super(idCode);
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

	public getSchemaLine(): string {
		return `${qstr.forceTitleNotation(this.idCode)};km`;
	}

}