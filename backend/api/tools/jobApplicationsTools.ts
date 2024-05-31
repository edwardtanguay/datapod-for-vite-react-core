import { JobApplication } from "../../../share/interfaces";

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

