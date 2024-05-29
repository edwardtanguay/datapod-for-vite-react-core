/* eslint-disable @typescript-eslint/no-explicit-any */
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
	SkillAndResponseBlock,
} from "../../../share/interfaces.js";
import jobs from "../../data/jobs.json";
const skillResponseLookup = qfil.readJsonFile(
	"./backend/data/skillResponseLookup.json"
);

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

const buildFormalFullName = (jobApplication: JobApplication): string => {
	let r = "UNKNOWN-FORMAL-FULL-NAME";
	if (jobApplication.language === "english") {
		r = `${buildContactTitle(jobApplication)} ${
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
	const publicationDate = qdat.getCurrentAmericanDate(job.publicationDate);
	if (jobApplication.language === "english") {
		return `Your job advertisement on the ${urlHostName} website from ${publicationDate}`;
	} else {
		return `TODO: Ihre Stellenanzeige auf der nnnwww.stepstone.de Website vom nnn10.02.2018`;
	}
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
			return "UNKNOWN-GREETING-LINE";
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
		return "UNKNOWN-GREETING-LINE: Sie suchen für Ihr Unternehmen einen Programmierer. Um diese Stelle bewerbe ich mich.";
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
		return `My earliest possible start date would be ${qstr.formatAsAmericanDateWithFullYear(
			jobApplication.earliestStartDate
		)}.`;
	} else {
		return `Mein frühester Eintrittstermin ist der ${qstr.formatAsGermanDateWithFullYear(
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
			const [attachmentText1, attachmentText2, attachmentText3] =
				getAttachmentTexts(jobApplication);
			const job = jobs.find((m) => m.id === jobApplication.baseJobId);
			if (job) {
				const fullJobApplication: FullJobApplication = {
					language: jobApplication.language,
					baseJobId: jobApplication.baseJobId,
					letterDateText: qdat.getCurrentAmericanDate(
						jobApplication.letterDate
					),
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
	} else {
		throw new Error("error: no job applications");
	}
});
