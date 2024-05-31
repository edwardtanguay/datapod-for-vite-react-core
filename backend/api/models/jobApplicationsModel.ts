import {
	FullJobApplication,
	Job,
	JobApplication,
} from "../../../share/interfaces";
import * as apptools from "../../apptools.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
import _jobs from "../../data/jobs.json";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qstr from "../../../share/qtools/qstr.js";
import * as tools from "../tools/jobApplicationsTools.js";

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
	if (jobApplicationsGroup) {
		const jsonData = jobApplicationsGroup.jsonData;
		const jobApplications: JobApplication[] = JSON.parse(jsonData);
		return jobApplications;
	} else {
		return [] as JobApplication[];
	}
};

export const getFullJobApplications = (): FullJobApplication[] => {
	const fullJobApplications: FullJobApplication[] = [];
	for (const jobApplication of getJobApplications()) {
		const [attachmentText1, attachmentText2, attachmentText3] =
			tools.getAttachmentTexts(jobApplication);
		const job = getJobs().find((m) => m.id === jobApplication.baseJobId);
		if (job) {
			const fullJobApplication: FullJobApplication = {
				language: jobApplication.language,
				baseJobId: jobApplication.baseJobId,
				letterDateText: tools.getLetterDateText(jobApplication),
				letterDate: jobApplication.letterDate,
				contactSalutation: tools.buildContactSaluation(jobApplication),
				jobTitle: job.title,
				company: job.company,
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
			};
			fullJobApplications.push(fullJobApplication);
		}
	}
	return fullJobApplications;
};
