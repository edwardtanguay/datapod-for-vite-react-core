import * as qstr from '../../share/qtools/qstr';
import { DataTypeJudoBelt } from './DataTypeJudoBelt';
import { DataTypeKilometers } from './DataTypeKilometers';
import { DataTypeLine } from './DataTypeLine';
import { DataTypeWholeNumber } from './DataTypeWholeNumber';
import { DataTypeUnknown } from './DataTypeUnknown';
import { DataTypeDate } from './DataTypeDate';
import { DataTypeUrl } from './DataTypeUrl';
import { DataTypeDuration } from './DataTypeDuration';
import { DataTypeSuuid } from './DataTypeSuuid';
import { DataTypeParagraph } from './DataTypeParagraph';
import { DataTypeDecimal } from './DataTypeDecimal';

export class Factory {

	public static instantiateDataType(dataTypeDefinitionLine: string) {
		if (!dataTypeDefinitionLine.includes(';')) {
			switch (dataTypeDefinitionLine) {
				case 'suuid':
					dataTypeDefinitionLine = 'Suuid;suuid';
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
			case 'suuid':
				return new DataTypeSuuid(idCode);
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
			default:
				return new DataTypeUnknown(idCode, dataTypeIdCode);
		}
	}
}