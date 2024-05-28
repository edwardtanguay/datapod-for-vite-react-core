/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IFileObject {
	pathAndFileName: string;
	content: string;
}

export interface ILineBlockDataItem {
	lines: string[];
}
export interface DpodItemGroupDataItem {
	idCode: string;
	label: string;
	singleLabel: string;
	jsonData: string;
	csvData: string;
	xmlData: string;
	datapodData: string;
	dpodItems: any[];
}

export interface IAppData {
	appIdCode: string;
	frontendPort: number;
	backendPort: number;
	fileObjects: IFileObject[];
	entireContent: string;
	lineBlockDataItems: ILineBlockDataItem[];
	dpodSchemaDataItems: any[];
	dpodItemGroupDataItems: DpodItemGroupDataItem[];
}

export const blankAppData = {
	appIdCode: "nnn",
	frontendPort: 0,
	backendPort: 0,
	fileObjects: [],
	entireContent: "",
	lineBlockDataItems: [],
	dpodSchemaDataItems: [],
	dpodItemGroupDataItems: [],
};

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

export type ILineBlockKind = "schema" | "item" | "UNKNOWN";

export type DpodSyntaxType = "simple" | "verbose";

export type JobApplication = {
	dpodId: string;
	language: "english" | "german";
	baseJobId: number;
	letterDate: string;
	skillTexts: string;
	customOutlineText: string;
	contactFullName: string;
	contactGender: "male" | "female";
	contactEmail: string;
	contactAddress: string;
};

export type SkillAndResponseBlock = {
	skillLine: string;
	responseHtml: string;
}

export type FullJobApplication = {
	language: string;
	baseJobId: number;
	letterDateText: string;
	contactSalutation: string;
	jobTitle: string;
	company: string;
	nameForCellPhone: string;
	companyAddressLines: string[];
	headerLine1: string;
	headerLine2: string;
	greetingLine: string;
	applicationLine: string;
	skillIntroLine: string;
	skillAndResponseBlocks: SkillAndResponseBlock[];
};

export type Job = {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	publicationDate: string;
};
