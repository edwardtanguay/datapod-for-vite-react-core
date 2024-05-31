import { JobApplication } from "../../../share/interfaces";
import * as qstr from "../../../share/qtools/qstr.js";
import * as tools from '../tools/jobApplicationsTools.js';

export const buildContactTitle = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-CONTACT-TITLE";
	if (
		jobApplication.language === "english" &&
		jobApplication.contactGender === "female"
	) {
		r = "Ms.";
	}
	if (
		jobApplication.language === "english" &&
		jobApplication.contactGender === "male"
	) {
		r = "Mr.";
	}
	if (
		jobApplication.language === "german" &&
		jobApplication.contactGender === "female"
	) {
		r = "Frau";
	}
	if (
		jobApplication.language === "german" &&
		jobApplication.contactGender === "male"
	) {
		r = "Herrn";
	}
	return r;
};

export const getNamesFromFullName = (
	jobApplication: JobApplication
): string[] => {
	const parts = qstr.breakIntoParts(jobApplication.contactFullName, " ");
	const firstName = parts[0];
	const lastName = parts[1];
	return [firstName, lastName];
};

export const buildFormalName = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-FORMAL-NAME";
	const [, lastName] = getNamesFromFullName(jobApplication);
	r = `${tools.buildContactTitle(jobApplication)} ${lastName}`;
	return r;
};
