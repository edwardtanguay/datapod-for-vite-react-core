import { DataType } from "./DataType";
import * as qstr from '../../share/qtools/qstr';

export class DataTypeSuuid extends DataType {

	protected dataTypeIdCode = 'dpodId';

	constructor(idCode:string) {
		super(idCode);
		this.value = qstr.generateShortUUID();
	}

}