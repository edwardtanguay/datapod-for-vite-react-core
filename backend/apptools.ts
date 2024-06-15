import {
	CompanyInfoItem,
	IFileObject,
	ProcessStatus,
	QuickApplication,
	QuickApplicationFileInfos,
} from "../share/interfaces.js";
import * as qfil from "../share/qtools/qfil.js";
import * as qstr from "../share/qtools/qstr.js";
import * as appconfig from "./appconfig.js";
import * as apptools from "./apptools.js";

export const extractPortNumber = (text: string) => {
	const regex = /(\d+)/;
	const match = text.match(regex);
	return match ? parseInt(match[0], 10) : 0;
};

/**
 * getFileObjects
 *
 * const fileObjects = getFileObjects(pathAndFileNames);
 *
 */
export const getFileObjects = (pathAndFileNames: string[]): IFileObject[] => {
	const fileObjects = [] as IFileObject[];
	for (const pathAndFileName of pathAndFileNames) {
		fileObjects.push({
			pathAndFileName,
			content: qfil.readTextFile(
				appconfig.importDirectory() + "/" + pathAndFileName
			),
		});
	}
	return fileObjects;
};

/**
 * getEntireContent
 *
 *
 */
export const getEntireContent = (fileObjects: IFileObject[]): string => {
	let r = "";
	for (const fileObject of fileObjects) {
		r += fileObject.content;
		r += "\n\n";
	}
	return r;
};

export const getCompanyFromFileName = (fileName: string): string => {
	let r = fileName;
	r = qstr.chopRight(r, ".txt");
	r = qstr.replaceAll(r, "-", ".");
	const parts = qstr.breakIntoParts(r, ".");
	const titleParts = parts.map((m) => qstr.forceTitleNotation(m));
	r = titleParts.join(" ");
	return r;
};

const getQuickApplicationFileInfosFromFileName = (
	pathAndFileName: string,
	status: ProcessStatus
): QuickApplicationFileInfos => {
	const content = qfil.readTextFile(pathAndFileName);
	const lines = qstr.convertStringBlockToLines(content);

	// statusWhen
	const line1 = lines[0];
	const statusWhen = qstr.getIsoDateTimeFromString(line1);

	// check if interviewing
	for (const line of lines) {
		if (line.includes("~interviewing")) {
			status = "interviewing";
		}
	}
	return {
		statusWhen,
		status,
	};
};

export const buildQuickApplicationsForDirectory = (
	directory: string,
	status: ProcessStatus
): QuickApplication[] => {
	const pathAndFileNames = qfil.getPathAndFileNamesInDirectory(directory);

	const quickApplications: QuickApplication[] = [];
	for (const pathAndFileName of pathAndFileNames) {
		const fileName = qfil.getFileNameFromPathAndFileName(pathAndFileName);
		const quickApplicationFileInfos =
			getQuickApplicationFileInfosFromFileName(pathAndFileName, status);
		const company = getCompanyFromFileName(fileName);
		if (quickApplicationFileInfos.statusWhen.trim() !== "") {
			quickApplications.push({
				id: 0,
				company,
				recruiter: false,
				status: quickApplicationFileInfos.status,
				statusWhen: quickApplicationFileInfos.statusWhen,
			});
		} else {
			console.log(`FIX: No date in file: ${pathAndFileName}`);
		}
	}
	return quickApplications;
};

export const buildQuickApplications = (): QuickApplication[] => {
	const quickApplications = [
		...buildQuickApplicationsForDirectory(
			"notes/otherJobApplications",
			"active"
		),
		...buildQuickApplicationsForDirectory(
			"notes/otherJobApplications/_REJECTIONS",
			"rejected"
		),
	];
	quickApplications.sort((a, b) => (a.company < b.company ? 1 : -1));
	return quickApplications;
};

export const getCompanyInfoItems = (): CompanyInfoItem[] => {
	const companyInfoItems: CompanyInfoItem[] = qfil.readJsonFile(
		"./backend/data/companyInfoItems.json"
	);
	return companyInfoItems;
};

export const buildOverviewListText = (): string => {
	const lines = [];
	const companyInfoItems = apptools.getCompanyInfoItems();

	for (const companyInfoItem of companyInfoItems) {
		if (
			companyInfoItem.kind !== "closed" ||
			(companyInfoItem.kind === "closed" &&
				companyInfoItem.kindClosedReason === "rejected")
		) {
			const line = `${companyInfoItem.companyName} (${companyInfoItem.id}) - (companyKind=${companyInfoItem.companyKind}) - (kind=${companyInfoItem.kind})`;
			lines.push(line);
		}
	}

	lines.unshift(`${lines.length} COMPANIES:`);

	return qstr.convertLinesToStringBlock(lines);
};
