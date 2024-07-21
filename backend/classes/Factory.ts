import * as qstr from '../../share/qtools/qstr';
import { DataTypeJudoBelt } from './DataTypeJudoBelt';
import { DataTypeKilometers } from './DataTypeKilometers';
import { DataTypeLine } from './DataTypeLine';
import { DataTypeWholeNumber } from './DataTypeWholeNumber';
import { DataTypeUnknown } from './DataTypeUnknown';
import { DataTypeDate } from './DataTypeDate';
import { DataTypeUrl } from './DataTypeUrl';
import { DataTypeDuration } from './DataTypeDuration';
import { DataTypeDpodId } from './DataTypeDpodId';
import { DataTypeParagraph } from './DataTypeParagraph';
import { DataTypeDecimal } from './DataTypeDecimal';
import { DataTypeYesNo } from './DataTypeYesNo';
import { DataTypeDpodWhenCreated } from './DataTypeDpodWhenCreated';

export class Factory {

	public static instantiateDataType(dataTypeDefinitionLine: string) {
		if (!dataTypeDefinitionLine.includes(';')) {
			switch (dataTypeDefinitionLine) {
				case 'dpodId':
					dataTypeDefinitionLine = 'DpodId;dpodId';
					break;
				case 'dpodWhenCreated':
					dataTypeDefinitionLine = 'DpodWhenCreated;dpodWhenCreated';
					break;
				case 'Date':
					dataTypeDefinitionLine += ';date';
					break;
				case 'Url':
					dataTypeDefinitionLine += ';url';
					break;
				case 'Kilometers':
					dataTypeDefinitionLine += ';km';
					break;
				case 'Duration':
					dataTypeDefinitionLine += ';duration';
					break;
				default:
					dataTypeDefinitionLine += ';line';
					break;
			}
		}

		const parts = qstr.breakIntoParts(dataTypeDefinitionLine, ';');
		const idCode = parts[0];
		const dataTypeIdCode = parts[1]; // TODO: make a type
		switch (dataTypeIdCode) {
			case 'line':
				return new DataTypeLine(idCode);
			case 'p':
			case 'paragraph':
				return new DataTypeParagraph(idCode);
			case 'km':
			case 'kilometers':
				return new DataTypeKilometers(idCode);
			case 'date':
				return new DataTypeDate(idCode);
			case 'dpodId':
				return new DataTypeDpodId(idCode);
			case 'dpodWhenCreated':
				return new DataTypeDpodWhenCreated(idCode);
			case 'wn':
			case 'wholeNumber':
				return new DataTypeWholeNumber(idCode);
			case 'dec':
			case 'decimal':
				return new DataTypeDecimal(idCode);
			case 'url':
				return new DataTypeUrl(idCode);
			case 'duration':
				return new DataTypeDuration(idCode);
			case 'judoBelt':
				return new DataTypeJudoBelt(idCode);
			case 'yn':
			case 'yesNo':
				return new DataTypeYesNo(idCode);
			default:
				return new DataTypeUnknown(idCode, dataTypeIdCode);
		}
	}
}