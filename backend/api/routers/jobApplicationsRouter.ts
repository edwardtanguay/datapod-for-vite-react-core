/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qstr from "../../../share/qtools/qstr.js";
import * as qdat from "../../../share/qtools/qdat.js";
// import * as qdev from "../../../share/qtools/qdev.js";
import {
	FullJobApplication,
	Job,
	JobApplication,
	SkillAndResponseBlock,
} from "../../../share/interfaces.js";
const skillResponseLookup = qfil.readJsonFile(
	"./backend/data/skillResponseLookup.json"
);
import * as model from "../models/jobApplicationsModel.js";
import * as tools from '../tools/jobApplicationsTools.js';

export const jobApplicationsRouter = Router();

const getNamesFromFullName = (jobApplication: JobApplication): string[] => {
	const parts = qstr.breakIntoParts(jobApplication.contactFullName, " ");
	const firstName = parts[0];
	const lastName = parts[1];
	return [firstName, lastName];
};

const buildFormalName = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-FORMAL-NAME";
	const [, lastName] = getNamesFromFullName(jobApplication);
	r = `${tools.buildContactTitle(jobApplication)} ${lastName}`;
	return r;
};

const buildFormalFullName = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-FORMAL-FULL-NAME";
	if (jobApplication.language === "english") {
		r = `${tools.buildContactTitle(jobApplication)} ${
			jobApplication.contactFullName
		}`;
	}
	if (jobApplication.language === "german") {
		r = `${tools.buildContactTitle(jobApplication)} ${
			jobApplication.contactFullName
		}`;
	}
	return r;
};

const buildContactSaluation = (jobApplication: JobApplication): string => {
	if (jobApplication.contactFullName.trim() === "") {
		return "";
	}
	let r = "UNKNOWN-CONTACT-SALUTATION";
	if (jobApplication.language === "english") {
		r = `c/o ${buildFormalFullName(jobApplication)}`;
	}
	if (jobApplication.language === "german") {
		r = `z.H. ${buildFormalFullName(jobApplication)}`;
	}
	return r;
};

const getNameForCellPhone = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "Cell";
	} else {
		return "Mobil";
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
	if (jobApplication.language === "english") {
		const publicationDate = qdat.getAmericanDate(job.publicationDate);
		return `Your job advertisement on the ${urlHostName} website from ${publicationDate}`;
	} else {
		const publicationDate = qdat.getGermanDate(job.publicationDate);
		// Ihre Stellenanzeige auf der www.stepstone.de Website vom 10.02.2018
		return `Ihre Stellenanzeige auf der ${urlHostName} Website vom ${publicationDate}`;
	}
};

const getLastName = (jobApplication: JobApplication): string => {
	const [, lastName] = getNamesFromFullName(jobApplication);
	return lastName;
};

const getGreetingLine = (jobApplication: JobApplication): string => {
	if (jobApplication.contactFullName.trim() === "") {
		if (jobApplication.language === "english") {
			return "To Whom It May Concern:";
		} else {
			return "Sehr geehrte Damen und Herren,";
		}
	} else {
		if (jobApplication.language === "english") {
			return `Dear ${buildFormalName(jobApplication)},`;
		} else {
			if (jobApplication.contactGender === "female") {
				return `Sehr geehrte ${buildFormalName(jobApplication)},`;
			} else {
				return `Sehr geehrter Herr ${getLastName(jobApplication)},`;
			}
		}
	}
};

const getApplicationLine = (
	job: Job,
	jobApplication: JobApplication
): string => {
	if (jobApplication.language === "english") {
		return `With this letter I am formally applying for the advertised position of ${job.title}.`;
	} else {
		return `Sie suchen für Ihr Unternehmen einen ${job.title}. Um diese Stelle bewerbe ich mich.`;
	}
};

const getSkillIntroLine = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "My skills match your requirements perfectly:";
	} else {
		return "Meine Fähigkeiten entsprechen Ihrem Anforderungsprofil perfekt:";
	}
};

// responseHtmlIdCodeList can be "reactNative" or "reactNative, serverless, awsLambda"
const getResponseHtml = (
	responseHtmlIdCodeList: string,
	jobApplication: JobApplication
): string => {
	const responseHtmls: string[] = [];
	const responseHtmlIdCodes = qstr.breakIntoParts(
		responseHtmlIdCodeList,
		","
	);

	for (const responseHtmlIdCode of responseHtmlIdCodes) {
		const skillResponseLookupObject: any =
			skillResponseLookup[responseHtmlIdCode];
		if (skillResponseLookupObject) {
			const responseHtml =
				skillResponseLookupObject[jobApplication.language];
			if (responseHtml) {
				responseHtmls.push(responseHtml);
			} else {
				responseHtmls.push(
					`TRANSLATE ${jobApplication.language} RESPONSE FOR ${responseHtmlIdCode}`
				);
			}
		} else {
			responseHtmls.push(
				`<span style="color: red">[<span style="background-color:yellow">${responseHtmlIdCode}</span>]</span>`
			);
		}
	}
	return responseHtmls.join(" ");
};

const getSkillAndResponseBlock = (
	skillText: string,
	jobApplication: JobApplication
): SkillAndResponseBlock => {
	const parts = qstr.breakIntoParts(skillText, ";");
	let skillLine = parts[0];
	skillLine = qstr.chopRight(skillLine, ".");
	skillLine = qstr.chopRight(skillLine, "!");
	const responseHtmlIdCodeList = parts[1];
	const responseHtml = getResponseHtml(
		responseHtmlIdCodeList,
		jobApplication
	);
	return {
		skillLine: `${skillLine}:`,
		responseHtml: responseHtml,
	};
};

const getSkillAndResponseBlocks = (
	jobApplication: JobApplication
): SkillAndResponseBlock[] => {
	const skillTexts = qstr.convertStringBlockToLines(
		jobApplication.skillTextsBlock
	);
	const skillAndResponseBlocks: SkillAndResponseBlock[] = [];
	for (const skillText of skillTexts) {
		skillAndResponseBlocks.push(
			getSkillAndResponseBlock(skillText, jobApplication)
		);
	}
	return skillAndResponseBlocks;
};

const getAttachmentTexts = (jobApplication: JobApplication): string[] => {
	let attachmentText1 = "";
	let attachmentText2 = "";
	let attachmentText3 = "";
	const size = "7 MB";
	if (jobApplication.language === "english") {
		attachmentText1 = "My application documents can be found at";
		attachmentText2 = "also attached as PDF";
		attachmentText3 = `all reference letters as ${size} zip file`;
	} else {
		attachmentText1 =
			"Meine ausführlichen Bewerbungsunterlagen finden Sie unter";
		attachmentText2 = "auch anbei als PDF";
		attachmentText3 = `Arbeitszeugnisse als ${size} zip-Datei`;
	}
	return [attachmentText1, attachmentText2, attachmentText3];
};

const getSalaryText = (jobApplication: JobApplication): string => {
	if (jobApplication.salaryFrom === 0 || jobApplication.salaryTo === 0) {
		return "";
	}
	let fromText = "";
	let toText = "";
	const salaryFrom: number = Number(jobApplication.salaryFrom);
	const salaryTo: number = Number(jobApplication.salaryTo);
	if (jobApplication.language === "english") {
		fromText = qstr.formatNumberAsAmericanThousandsEuroCurrency(salaryFrom);
		toText = qstr.formatNumberAsAmericanThousandsEuroCurrency(salaryTo);
		return `My salary expectations are between ${fromText} and ${toText} per month gross.`;
	} else {
		fromText = qstr.formatNumberAsGermanThousandsEuroCurrency(salaryFrom);
		toText = qstr.formatNumberAsGermanThousandsEuroCurrency(salaryTo);
		return `Meine Gehaltsvorstellung liegt zwischen ${fromText} und ${toText} brutto monatlich.`;
	}
};

const getStartDateLine = (jobApplication: JobApplication): string => {
	if (jobApplication.earliestStartDate.trim() === "") {
		return "";
	}
	if (jobApplication.language === "english") {
		return `My earliest possible start date would be ${qdat.formatAsAmericanDateWithFullYear(
			jobApplication.earliestStartDate
		)}.`;
	} else {
		return `Mein frühester Eintrittstermin ist der ${qdat.formatAsGermanDateWithFullYear(
			jobApplication.earliestStartDate
		)}.`;
	}
};

const getClosingParagraph = (jobApplication: JobApplication): string => {
	return jobApplication.closingParagraph;
};

const getClosingPhrase = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "Sincerely,";
	} else {
		return "Mit freundlichen Grüßen";
	}
};

const getLetterDateText = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return qdat.getAmericanDate(jobApplication.letterDate);
	} else {
		// 08. Februar 2018
		return qdat.formatAsGermanDateWithFullYear(jobApplication.letterDate);
	}
};

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(model.getJobs());
});

jobApplicationsRouter.get("/full", (_req, res) => {
	const fullJobApplications: FullJobApplication[] = [];
	for (const jobApplication of model.getJobApplications()) {
		const [attachmentText1, attachmentText2, attachmentText3] =
			getAttachmentTexts(jobApplication);
		const job = model
			.getJobs()
			.find((m) => m.id === jobApplication.baseJobId);
		if (job) {
			const fullJobApplication: FullJobApplication = {
				language: jobApplication.language,
				baseJobId: jobApplication.baseJobId,
				letterDateText: getLetterDateText(jobApplication),
				letterDate: jobApplication.letterDate,
				contactSalutation: buildContactSaluation(jobApplication),
				jobTitle: job.title,
				company: job.company,
				nameForCellPhone: getNameForCellPhone(jobApplication),
				companyAddressLines: getAddressLines(jobApplication),
				headerLine1: getHeaderLine1(job, jobApplication),
				headerLine2: getHeaderLine2(job, jobApplication),
				greetingLine: getGreetingLine(jobApplication),
				applicationLine: getApplicationLine(job, jobApplication),
				skillIntroLine: getSkillIntroLine(jobApplication),
				skillAndResponseBlocks:
					getSkillAndResponseBlocks(jobApplication),
				customText: jobApplication.customText,
				customOutlineHtml: qstr.buildOutlineHtml(
					jobApplication.customOutlineText
				),
				attachmentText1,
				attachmentText2,
				attachmentText3,
				salaryText: getSalaryText(jobApplication),
				startDateLine: getStartDateLine(jobApplication),
				closingParagraph: getClosingParagraph(jobApplication),
				closingPhrase: getClosingPhrase(jobApplication),
				jobAnnouncementUrl: job.url,
			};
			fullJobApplications.push(fullJobApplication);
		}
	}
	res.json(fullJobApplications);
});

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = [
		{
			test: "111",
		},
		{
			test: "222",
		},
		{
			test: "333",
		},
	];
	res.json(overviewJobApplications);
});
