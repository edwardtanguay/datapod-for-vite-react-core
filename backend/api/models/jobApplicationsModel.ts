import {
	ApplicationDay,
	FullJobApplication,
	FullReport,
	GroupedApplicationDayReport,
	Job,
	JobApplication,
	OverviewJobApplication,
	ProcessStatus,
} from "../../../share/interfaces";
import * as apptools from "../../apptools.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
import _jobs from "../../data/jobs.json";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qstr from "../../../share/qtools/qstr.js";
import * as qdat from "../../../share/qtools/qdat.js";
import * as tools from "../tools/jobApplicationsTools.js";
import * as model from "./jobApplicationsModel.js";
// import * as qdev from "../../../share/qtools/qdev.js";

// jobs (from online JSON file)
export const getJobs = (): Job[] => {
	const jobs: Job[] = [];
	for (const _job of _jobs) {
		const job: Job = {
			id: _job.id,
			title: _job.title,
			company: _job.company,
			url: _job.url,
			description: _job.description,
			skillList: _job.skillList,
			publicationDate: _job.publicationDate,
			rank: _job.rank ? _job.rank : 2.5,
		};
		jobs.push(job);
	}
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

// remove parentheses at then end, e.g. "Tech Punk GmbH (Recruiter)"
const getJobCompany = (job: Job) => {
	const parts = qstr.breakIntoParts(job.company, "(");
	const company = parts[0];
	return company;
};

export const getFullJobApplications = (): FullJobApplication[] => {
	const fullJobApplications: FullJobApplication[] = [];
	const jobApplications = getJobApplications();
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
	return fullJobApplications;
};

const padGroupedapplicationDayReportWithEmptyDays = (
	groupedApplicationDayReport: GroupedApplicationDayReport
) => {
	const dates: string[] = [];
	for (const applicationDayDate of Object.keys(groupedApplicationDayReport)) {
		dates.push(applicationDayDate);
	}
	const endDate = qdat.getTodayAsIso();
	const startDate = dates[dates.length - 1];
	const allDates = qdat.fillDateArray(startDate, endDate);
	allDates.reverse();

	const newGroupedApplicationDayReport = {} as GroupedApplicationDayReport;
	for (const allDate of allDates) {
		const applicationDays = groupedApplicationDayReport[allDate];
		if (applicationDays) {
			newGroupedApplicationDayReport[allDate] = applicationDays;
		} else {
			newGroupedApplicationDayReport[allDate] = [];
		}
	}
	return newGroupedApplicationDayReport;
};

export const getFullReport = (): FullReport => {
	const overviewJobApplications = model.getOverviewApplications();
	overviewJobApplications.sort((a, b) =>
		a.letterDate < b.letterDate ? 1 : -1
	);
	const applicationDays: ApplicationDay[] = [];
	let numberOfRejections = 0;
	let numberDoing = 0;

	// add quick applications
	const quickApplications = apptools.buildQuickApplications();

	for (const overviewJobApplication of overviewJobApplications) {
		if (
			(overviewJobApplication.letterDate.trim() !== "" &&
				overviewJobApplication.kind !== "closed") ||
			overviewJobApplication.lastStatus.includes("rejection:")
		) {
			let processStatus: ProcessStatus =
				overviewJobApplication.lastStatus.includes("rejection:")
					? "rejected"
					: "active";
			if (overviewJobApplication.lastStatus.includes("...")) {
				processStatus = "doing";
				numberDoing++;
			}
			const day: ApplicationDay = {
				title: overviewJobApplication.job.title,
				company: overviewJobApplication.job.company,
				letterDate: overviewJobApplication.letterDate,
				longLetterDate:
					qdat.getAmericanDayAbbreviation(
						overviewJobApplication.letterDate
					) +
					" " +
					overviewJobApplication.letterDate,
				processStatus,
				speedKind: "coverLetterApplication",
			};
			if (processStatus === "rejected") {
				numberOfRejections++;
			}
			applicationDays.push(day);
		}
	}

	// add quickapplications into overviewJobApplications
	for (const quickApplication of quickApplications) {
		// const tempLetterDate = '2024-06-13 11:47:23';  //quickApplication.statusWhen;
		const tempLetterDate = quickApplication.statusWhen;
		const day: ApplicationDay = {
			title: "ttt",
			company: quickApplication.company,
			letterDate: tempLetterDate,
			longLetterDate:
				qdat.getAmericanDayAbbreviation(tempLetterDate) +
				" " +
				tempLetterDate,
			processStatus: quickApplication.status,
			speedKind: "quickApplication",
		};
		if (day.processStatus === "rejected") {
			numberOfRejections++;
		}

		applicationDays.push(day);
	}
	applicationDays.sort((a, b) => (a.letterDate < b.letterDate ? 1 : -1));

	let groupedApplicationDayReport: GroupedApplicationDayReport =
		applicationDays.reduce((acc, day) => {
			const date = day.letterDate.split(" ")[0];
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(day);
			return acc;
		}, {});

	groupedApplicationDayReport = padGroupedapplicationDayReportWithEmptyDays(
		groupedApplicationDayReport
	);

	const totalApplications = applicationDays.length - numberDoing;
	const totalDays = Object.keys(groupedApplicationDayReport).length;
	const numberActive = totalApplications - numberOfRejections;
	const rejectionRate = numberOfRejections / totalApplications;
	return {
		totalApplications,
		totalDays,
		averageApplicationsPerDay: Number(
			(totalApplications / totalDays).toFixed(2)
		),
		groupedApplicationDayReport,
		numberOfRejections,
		numberActive,
		rejectionRate
	};
};

export const getOverviewApplications = (): OverviewJobApplication[] => {
	const overviewJobApplications: OverviewJobApplication[] = [];
	const fullJobApplications = getFullJobApplications();

	// load coverLetterApplications into overviewJobApplications
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
		if (overviewJobApplication.lastStatus) {
			if (overviewJobApplication.lastStatus.includes("~duplicate")) {
				overviewJobApplication.kind = "closed";
				overviewJobApplication.lastStatus = qstr.replaceAll(
					overviewJobApplication.lastStatus,
					"~",
					""
				);
			}
			if (overviewJobApplication.lastStatus.includes("~rejection")) {
				overviewJobApplication.kind = "closed";
				overviewJobApplication.lastStatus = qstr.replaceAll(
					overviewJobApplication.lastStatus,
					"~",
					""
				);
			}
			if (overviewJobApplication.lastStatus.includes("~filled")) {
				overviewJobApplication.kind = "closed";
				overviewJobApplication.lastStatus = qstr.replaceAll(
					overviewJobApplication.lastStatus,
					"~",
					""
				);
			}
		} else {
			overviewJobApplication.lastStatus = "";
		}
	}
	return overviewJobApplications;
};
