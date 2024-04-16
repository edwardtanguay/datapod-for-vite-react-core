import { DataType } from "./DataType";
import * as qstr from '../../share/qtools/qstr';

export class DataTypeParagraph extends DataType {

	constructor(idCode:string) {
		super(idCode);
		this.dataTypeIdCode = 'paragraph';
	}
	
	public getTextValue() {
		console.log('THISVALUE', this.value);
		return this.value ? qstr.convertFromHtml(this.value) : '';
	}


}