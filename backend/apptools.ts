import {
	IFileObject,
	ProcessStatus,
	QuickApplication,
	QuickApplicationFileInfos,
} from "../share/interfaces.js";
import * as qfil from "../share/qtools/qfil.js";
import * as qstr from "../share/qtools/qstr.js";
import * as appconfig from "./appconfig.js";

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
	fileName: string
): QuickApplicationFileInfos => {
	return {
		statusWhen: "2024-06-12 14:13:53",
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
			getQuickApplicationFileInfosFromFileName(fileName);

		const company = getCompanyFromFileName(fileName);
		quickApplications.push({
			id: 0,
			company,
			recruiter: false,
			status,
			statusWhen: quickApplicationFileInfos.statusWhen,
		});
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
