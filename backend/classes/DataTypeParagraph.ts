import { DataType } from "./DataType";
import * as qstr from "../../share/qtools/qstr";

export class DataTypeParagraph extends DataType {
	constructor(idCode: string) {
		super(idCode);
		this.dataTypeIdCode = "paragraph";
		this.abbreviatedDataTypeIdCode = "p";
	}

	public getTextValue() {
		return this.value ? qstr.convertFromHtml(this.value) : "";
	}

	public getDatapodDataLine() {
		let r = "";
		const value = this.getTextValue();
		const valueUnescaped = qstr.unescapeText(value);
		const lines = qstr.convertStringBlockToLines(valueUnescaped);
		if (lines.length === 0) {
			r += `${this.idCode}::`;
		} else if (lines.length === 1) {
			r += `${this.idCode}::${this.getTextValue()}`;
		} else {
			r += `${this.idCode}::(multiline with ${lines.length} lines)`;
		}
		return r;
	}
}
