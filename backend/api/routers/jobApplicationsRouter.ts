import { Router } from "express";
import * as apptools from "../../apptools.js";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qstr from "../../../share/qtools/qstr.js";
import * as qdat from "../../../share/qtools/qdat.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
// import * as qdev from "../../../share/qtools/qdev.js";
import {
	FullJobApplication,
	Job,
	JobApplication,
} from "../../../share/interfaces.js";
import jobs from "../../data/jobs.json";

export const jobApplicationsRouter = Router();

const buildContactTitle = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-CONTACT-TITLE";
	if (
		jobApplication.language === "english" &&
		jobApplication.contactGender === "female"
	) {
		r = "Ms.";
	}
	return r;
};

const getNamesFromFullName = (jobApplication: JobApplication): string[] => {
	const parts = qstr.breakIntoParts(jobApplication.contactFullName, " ");
	const firstName = parts[0];
	const lastName = parts[1];
	return [firstName, lastName];
};

const buildFormalName = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-FORMAL-NAME";
	const [, lastName] = getNamesFromFullName(jobApplication);
	if (jobApplication.language === "english") {
		r = `${buildContactTitle(jobApplication)} ${lastName}`;
	}
	return r;
};

const buildContactSaluation = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-CONTACT-SALUTATION";
	if (jobApplication.language === "english") {
		r = `c/o ${buildFormalName(jobApplication)}`;
	}
	return r;
};

const getNameForCellPhone = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "Cell";
	} else {
		return "Handy";
	}
};

const getAddressLines = (jobApplication: JobApplication): string[] => {
	return qstr.convertStringBlockToLines(jobApplication.contactAddress);
};

const getHeaderLine1 = (job: Job, jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return `Application for the position of ${job.title}`;
	} else {
		return `Bewerbung um die Stelle als ${job.title}`;
	}
};

const getHeaderLine2 = (job: Job, jobApplication: JobApplication): string => {
	const urlHostName = qstr.getHostnameFromUrl(job.url);
	const publicationDate = qdat.getCurrentAmericanDate(job.publicationDate);
	if (jobApplication.language === "english") {
		return `Your job advertisement on the ${urlHostName} website from ${publicationDate}`;
	} else {
		return `TODO: Ihre Stellenanzeige auf der nnnwww.stepstone.de Website vom nnn10.02.2018`;
	}
};

const getGreetingLine = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return `Dear ${buildFormalName(jobApplication)},`;
	} else {
		return "UNKNOWN-GREETING-LINE";
	}
};

jobApplicationsRouter.get("/full", (_req, res) => {
	const pathAndFileNames = qfil.getFileNamesInDirectory(
		appconfig.importDirectory()
	);
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);
	const dpodItemGroupDataItems = dpodDataLoader.getDpodItemGroupDataItems();
	const jobApplicationsGroup = dpodItemGroupDataItems.find(
		(m) => m.idCode === "jobApplications"
	);
	if (jobApplicationsGroup) {
		const jsonData = jobApplicationsGroup.jsonData;
		const jobApplications: JobApplication[] = JSON.parse(jsonData);
		const fullJobApplications: FullJobApplication[] = [];
		for (const jobApplication of jobApplications) {
			const job = jobs.find((m) => m.id === jobApplication.baseJobId);
			if (job) {
				const fullJobApplication: FullJobApplication = {
					language: jobApplication.language,
					baseJobId: jobApplication.baseJobId,
					letterDateText: qdat.getCurrentAmericanDate(
						jobApplication.letterDate
					),
					contactSalutation: buildContactSaluation(jobApplication),
					jobTitle: job.title,
					company: job.company,
					nameForCellPhone: getNameForCellPhone(jobApplication),
					companyAddressLines: getAddressLines(jobApplication),
					headerLine1: getHeaderLine1(job, jobApplication),
					headerLine2: getHeaderLine2(job, jobApplication),
					greetingLine: getGreetingLine(jobApplication),
				};
				fullJobApplications.push(fullJobApplication);
			}
		}
		res.json(fullJobApplications);
	} else {
		throw new Error("error: no job applications");
	}
});
