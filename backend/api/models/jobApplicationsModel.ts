import {
	FullJobApplication,
	Job,
	JobApplication,
	OverviewJobApplication,
} from "../../../share/interfaces";
import * as apptools from "../../apptools.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
import _jobs from "../../data/jobs.json";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qstr from "../../../share/qtools/qstr.js";
import * as tools from "../tools/jobApplicationsTools.js";
// import * as qdev from "../../../share/qtools/qdev.js";


// jobs (from online JSON file)
export const getJobs = (): Job[] => {
	const jobs: Job[] = _jobs;
	return jobs;
};

// jobApplications (Datapod type)
export const getJobApplications = (): JobApplication[] => {
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
	console.log('jobApplicationsGroup',jobApplicationsGroup);
	if (jobApplicationsGroup) {
		const jsonData = jobApplicationsGroup.jsonData;
		const jobApplications: JobApplication[] = JSON.parse(jsonData);
		return jobApplications;
	} else {
		return [] as JobApplication[];
	}
};

// remove parentheses at then end, e.g. "Tech Punk GmbH (Recruiter)"
const getJobCompany = (job: Job) => {
	const parts = qstr.breakIntoParts(job.company, '(');
	const company = parts[0];
	return company;
}

export const getFullJobApplications = (): FullJobApplication[] => {
	const fullJobApplications: FullJobApplication[] = [];
	const jobApplications = getJobApplications();
	console.log('jobApplciations', jobApplications.length);
	for (const jobApplication of jobApplications) {
		const [attachmentText1, attachmentText2, attachmentText3] =
			tools.getAttachmentTexts(jobApplication);
		const job = getJobs().find((m) => m.id === jobApplication.baseJobId);
		if (job) {
			const fullJobApplication: FullJobApplication = {
				language: jobApplication.language,
				baseJobId: jobApplication.baseJobId,
				contactKind: jobApplication.contactKind,
				letterDateText: tools.getLetterDateText(jobApplication),
				letterDate: jobApplication.letterDate,
				contactSalutation: tools.buildContactSaluation(jobApplication),
				jobTitle: job.title,
				company: getJobCompany(job),
				nameForCellPhone: tools.getNameForCellPhone(jobApplication),
				companyAddressLines: tools.getAddressLines(jobApplication),
				headerLine1: tools.getHeaderLine1(job, jobApplication),
				headerLine2: tools.getHeaderLine2(job, jobApplication),
				greetingLine: tools.getGreetingLine(jobApplication),
				applicationLine: tools.getApplicationLine(job, jobApplication),
				skillIntroLine: tools.getSkillIntroLine(jobApplication),
				skillAndResponseBlocks:
					tools.getSkillAndResponseBlocks(jobApplication),
				customText: jobApplication.customText,
				customOutlineHtml: qstr.buildOutlineHtml(
					jobApplication.customOutlineText
				),
				attachmentText1,
				attachmentText2,
				attachmentText3,
				salaryText: tools.getSalaryText(jobApplication),
				startDateLine: tools.getStartDateLine(jobApplication),
				closingParagraph: tools.getClosingParagraph(jobApplication),
				closingPhrase: tools.getClosingPhrase(jobApplication),
				jobAnnouncementUrl: job.url,
				history: jobApplication.history,
				historyHtml: qstr.buildOutlineHtml(jobApplication.history),
			};
			fullJobApplications.push(fullJobApplication);
		}
	}
	console.log('full', fullJobApplications.length);
	return fullJobApplications;
};

export const getOverviewApplications = ():OverviewJobApplication[] => {
	const overviewJobApplications: OverviewJobApplication[] = [];
	const fullJobApplications = getFullJobApplications();
	for (const job of getJobs()) {
		const fullJobApplication = fullJobApplications.find((m) => {
			return m.baseJobId === job.id;
		});
		if (fullJobApplication) {
			const overviewJobApplication: OverviewJobApplication = {
				job,
				fullJobApplication,
				kind: tools.getKind(),
				lastStatus: tools.getLastStatus(fullJobApplication),
				applicationCreateText: "",
				letterDate: fullJobApplication.letterDate,
			};
			overviewJobApplications.push(overviewJobApplication);
		} else {
			const overviewJobApplication: OverviewJobApplication = {
				job,
				fullJobApplication,
				kind: "todo",
				lastStatus: "",
				applicationCreateText: tools.getApplicationCreateText(job),
				letterDate: "",
			};
			overviewJobApplications.push(overviewJobApplication);
		}
	}
	for (const overviewJobApplication of overviewJobApplications) {
		if (overviewJobApplication.lastStatus.includes("~duplicate")) {
			overviewJobApplication.kind = "closed";
			overviewJobApplication.lastStatus = qstr.replaceAll(
				overviewJobApplication.lastStatus,
				"~",
				""
			);
		}
	}
	return overviewJobApplications;
}