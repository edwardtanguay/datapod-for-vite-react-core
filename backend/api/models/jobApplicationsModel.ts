import {
	ApplicationDay,
	CompanyInfoItem,
	CompanyKind,
	FullJobApplication,
	FullReport,
	GroupedApplicationDayReport,
	Job,
	JobApplication,
	KindClosedReason,
	OverviewJobApplication,
	OverviewJobApplicationKind,
	ProcessStatus,
	QuickApplication,
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

const normalizeCompanyName = (company: string): string => {
	let r = company;
	r = qstr.chopRight(r, " (Recruiter)");
	r = qstr.chopRight(r, " recruiter");
	r = qstr.chopRight(r, " Recruiter");
	return r;
};

const getCompanyKindFromCompany = (company: string): CompanyKind => {
	return company.toLowerCase().includes("recruiter") ? "recruiter" : "normal";
};

export const getProcessStatus = (
	kind: OverviewJobApplicationKind,
	kindClosedReason: KindClosedReason
): ProcessStatus => {
	if (kind === "closed") {
		if (kindClosedReason === "rejected") {
			return "rejected";
		} else {
			return "closed";
		}
	} else {
		return "active";
	}
};

export const getCompanyInfoItems = (
	overviewJobApplications: OverviewJobApplication[],
	quickApplications: QuickApplication[]
): CompanyInfoItem[] => {
	const companyInfoItems: CompanyInfoItem[] = [];

	// process overviewApplications
	for (const overviewJobApplication of overviewJobApplications) {
		if (overviewJobApplication.fullJobApplication) {
			const companyName =
				overviewJobApplication.fullJobApplication.company;
			const kind = overviewJobApplication.kind;
			const kindClosedReason = overviewJobApplication.kindClosedReason;
			const companyInfoItem: CompanyInfoItem = {
				id: overviewJobApplication.job.id,
				companyName,
				contactKind:
					overviewJobApplication.fullJobApplication.contactKind,
				processStatus: getProcessStatus(kind, kindClosedReason),
			};
			companyInfoItems.push(companyInfoItem);
		}
	}

	// process quickApplications
	// for (const quickApplication of quickApplications) {
	// 	const companyInfoItem: CompanyInfoItem = {
	// 		id: quickApplication.id,
	// 		companyName: quickApplication.company,
	// 		contactKind: overviewJobApplication.fullJobApplication.contactKind,
	// 		processStatus: getProcessStatus(kind, kindClosedReason),
	// 	};
	// 	companyInfoItems.push(companyInfoItem);
	// }

	companyInfoItems.sort((a, b) =>
		a.companyName.toLowerCase() > b.companyName.toLowerCase() ? 1 : -1
	);
	return companyInfoItems;
};

export const getFullReport = (): FullReport => {
	const overviewJobApplications = model.getOverviewApplications();
	overviewJobApplications.sort((a, b) =>
		a.letterDate < b.letterDate ? 1 : -1
	);
	const applicationDays: ApplicationDay[] = [];
	let numberOfRejections = 0;
	let numberOfInterviewing = 0;
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
				company: normalizeCompanyName(
					overviewJobApplication.job.company
				),
				letterDate: overviewJobApplication.letterDate,
				longLetterDate:
					qdat.getAmericanDayAbbreviation(
						overviewJobApplication.letterDate
					) +
					" " +
					overviewJobApplication.letterDate,
				processStatus,
				speedKind: "coverLetterApplication",
				companyKind: getCompanyKindFromCompany(
					overviewJobApplication.job.company
				),
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
			company: normalizeCompanyName(quickApplication.company),
			letterDate: tempLetterDate,
			longLetterDate:
				qdat.getAmericanDayAbbreviation(tempLetterDate) +
				" " +
				tempLetterDate,
			processStatus: quickApplication.status,
			speedKind: "quickApplication",
			companyKind: getCompanyKindFromCompany(quickApplication.company),
		};
		if (day.processStatus === "rejected") {
			numberOfRejections++;
		}
		if (day.processStatus === "interviewing") {
			numberOfInterviewing++;
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

	// write to JSON file to avoid fs error in frontend
	qfil.createFile(
		"./backend/data/companyInfoItems.json",
		JSON.stringify(
			getCompanyInfoItems(overviewJobApplications, quickApplications),
			null,
			2
		)
	);

	return {
		totalApplications,
		totalDays,
		averageApplicationsPerDay: Number(
			(totalApplications / totalDays).toFixed(2)
		),
		groupedApplicationDayReport,
		numberOfRejections,
		numberActive,
		rejectionRate,
		numberOfInterviewing,
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
				kindClosedReason: "notApplicable",
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
				kindClosedReason: "notApplicable",
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
				overviewJobApplication.kindClosedReason = "duplicate";
				overviewJobApplication.lastStatus = qstr.replaceAll(
					overviewJobApplication.lastStatus,
					"~",
					""
				);
			}
			if (overviewJobApplication.lastStatus.includes("~rejection")) {
				overviewJobApplication.kind = "closed";
				overviewJobApplication.kindClosedReason = "rejected";
				overviewJobApplication.lastStatus = qstr.replaceAll(
					overviewJobApplication.lastStatus,
					"~",
					""
				);
			}
			if (overviewJobApplication.lastStatus.includes("~filled")) {
				overviewJobApplication.kind = "closed";
				overviewJobApplication.kindClosedReason = "filled";
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
