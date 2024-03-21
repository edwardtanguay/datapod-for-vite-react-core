/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFileObject {
	pathAndFileName: string;
	content: string;
}

export interface ILineBlockDataItem {
	lines: string[];
}

export interface IAppData {
	appIdCode: string;
	frontendPort: number;
	backendPort: number;
	fileObjects: IFileObject[];
	entireContent: string;
	lineBlockDataItems: ILineBlockDataItem[];
	dpodSchemaDataItems: any[];
	dpodItemGroupDataItems: any[];
}

export const blankAppData = {
	appIdCode: 'nnn',
	frontendPort: 0,
	backendPort: 0,
	fileObjects: [],
	entireContent: '',
	lineBlockDataItems: [],
	dpodSchemaDataItems: [],
	dpodItemGroupDataItems: []
}

export interface ISchemaField {
	idCode: string;
	dataTypeIdCope: string;
}

export interface IDataTypeDataItem {
	label: string;
	idCode: string;
	dataTypeIdCode: string;
}

export interface IDpodSchemaDataItem {
	idCode: string;
	label: string;
	dataTypes: IDataTypeDataItem[];
}

export type ILineBlockKind = 'schema' | 'item' | 'UNKNOWN';