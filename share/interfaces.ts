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
	quickApplications: QuickApplication[];
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
	referenceId: string;
	contactKind: "company" | "recruiter";
	letterDate: string;
	skillTextsBlock: string;
	customText: string;
	customOutlineText: string;
	contactFullName: string;
	contactGender: "male" | "female";
	contactEmail: string;
	contactAddress: string;
	salaryFrom: number;
	salaryTo: number;
	earliestStartDate: string;
	closingParagraph: string;
	history: string;
};

export type SkillAndResponseBlock = {
	skillLine: string;
	responseHtml: string;
};

export type FullJobApplication = {
	language: string;
	baseJobId: number;
	contactKind: string;
	jobAnnouncementUrl: string;
	letterDateText: string;
	letterDate: string;
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
	customText: string;
	customOutlineHtml: string;
	attachmentText1: string;
	attachmentText2: string;
	attachmentText3: string;
	salaryText: string;
	startDateLine: string;
	closingParagraph: string;
	closingPhrase: string;
	history: string;
	historyHtml: string;
};

export type Job = {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	publicationDate: string;
	rank: number;
};

export type SkillResponseLookupObject = {
	language: string;
	html: string;
};

export type OverviewJobApplicationKind = "todo" | "processing" | "closed";

export type OverviewJobApplication = {
	job: Job;
	fullJobApplication: FullJobApplication | undefined;
	kind: OverviewJobApplicationKind;
	lastStatus: string;
	applicationCreateText: string;
	letterDate: string;
};

export type ProcessStatus = "active" | "rejected" | "doing";

export type ApplicationDay = {
	title: string;
	company: string;
	letterDate: string;
	longLetterDate: string;
	processStatus: ProcessStatus;
};

export type GroupedApplicationDayReport = {
	[date: string]: ApplicationDay[];
};

export type FullReport = {
	totalApplications: number;
	totalDays: number;
	averageApplicationsPerDay: number;
	groupedApplicationDayReport: GroupedApplicationDayReport;
	numberOfRejections: number;
	numberActive: number;
};

export type QuickApplication = {
	id: number;
	company: string;
	recruiter: boolean;
	status: "appliedAndWaiting" | "interviewProcess" | "rejected";
	statusWhen: string;
};
