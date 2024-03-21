import { DataType } from "./DataType";
import * as qstr from '../../share/qtools/qstr';

export class DataTypeParagraph extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'paragraph';
	}
	
	public getTextValue() {
		return this.value ? qstr.convertFromHtml(this.value) : '';
	}


}