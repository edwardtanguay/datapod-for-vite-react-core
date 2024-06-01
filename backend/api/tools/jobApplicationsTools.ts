/* eslint-disable @typescript-eslint/no-explicit-any */
import * as qstr from "../../../share/qtools/qstr.js";
import * as qdat from "../../../share/qtools/qdat.js";
import * as qfil from "../../../share/qtools/qfil.js";
import * as tools from "../tools/jobApplicationsTools.js";
const skillResponseLookup = qfil.readJsonFile(
	"./backend/data/skillResponseLookup.json"
);
import {
	Job,
	JobApplication,
	SkillAndResponseBlock,
} from "../../../share/interfaces.js";

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

export const buildFormalFullName = (jobApplication: JobApplication): string => {
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

export const buildContactSaluation = (jobApplication: JobApplication): string => {
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

export const getNameForCellPhone = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "Cell";
	} else {
		return "Mobil";
	}
};

export const getAddressLines = (jobApplication: JobApplication): string[] => {
	return qstr.convertStringBlockToLines(jobApplication.contactAddress);
};

export const getHeaderLine1 = (job: Job, jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return `Application for the position of ${job.title}`;
	} else {
		return `Bewerbung um die Stelle als ${job.title}`;
	}
};

export const getHeaderLine2 = (job: Job, jobApplication: JobApplication): string => {
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

export const getLastName = (jobApplication: JobApplication): string => {
	const [, lastName] = tools.getNamesFromFullName(jobApplication);
	return lastName;
};

export const getGreetingLine = (jobApplication: JobApplication): string => {
	if (jobApplication.contactFullName.trim() === "") {
		if (jobApplication.language === "english") {
			return "To Whom It May Concern:";
		} else {
			return "Sehr geehrte Damen und Herren,";
		}
	} else {
		if (jobApplication.language === "english") {
			return `Dear ${tools.buildFormalName(jobApplication)},`;
		} else {
			if (jobApplication.contactGender === "female") {
				return `Sehr geehrte ${tools.buildFormalName(jobApplication)},`;
			} else {
				return `Sehr geehrter Herr ${getLastName(jobApplication)},`;
			}
		}
	}
};

export const getApplicationLine = ( 
	job: Job,
	jobApplication: JobApplication
): string => {
	if (jobApplication.language === "english") {
		return `With this letter I am formally applying for the advertised position of ${job.title}.`;
	} else {
		return `Sie suchen für Ihr Unternehmen einen ${job.title}. Um diese Stelle bewerbe ich mich.`;
	}
};

export const getSkillIntroLine = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "My skills match your requirements perfectly:";
	} else {
		return "Meine Fähigkeiten entsprechen Ihrem Anforderungsprofil perfekt:";
	}
};

// responseHtmlIdCodeList can be "reactNative" or "reactNative, serverless, awsLambda"
export const getResponseHtml = (
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

export const getSkillAndResponseBlock = (
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

export const getSkillAndResponseBlocks = (
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

export const getAttachmentTexts = (jobApplication: JobApplication): string[] => {
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

export const getSalaryText = (jobApplication: JobApplication): string => {
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

export const getStartDateLine = (jobApplication: JobApplication): string => {
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

export const getClosingParagraph = (jobApplication: JobApplication): string => {
	return jobApplication.closingParagraph;
};

export const getClosingPhrase = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return "Sincerely,";
	} else {
		return "Mit freundlichen Grüßen";
	}
};

export const getLetterDateText = (jobApplication: JobApplication): string => {
	if (jobApplication.language === "english") {
		return qdat.getAmericanDate(jobApplication.letterDate);
	} else {
		// 08. Februar 2018
		return qdat.formatAsGermanDateWithFullYear(jobApplication.letterDate);
	}
};
