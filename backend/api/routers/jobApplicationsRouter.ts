/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import {
	FullJobApplication,
	OverviewJobApplication,
	OverviewJobApplicationKind,
} from "../../../share/interfaces.js";
// import * as qdev from "../../../share/qtools/qdev.js";
import * as qstr from "../../../share/qtools/qstr.js";

const jobs = model.getJobs();
const fullJobApplications = model.getFullJobApplications();

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(jobs);
});

jobApplicationsRouter.get("/fullJobApplications", (_req, res) => {
	res.json(fullJobApplications);
});

// const getKind = ( fullJobApplication: FullJobApplication): OverviewJobApplicationKind => {
const getKind = (): OverviewJobApplicationKind => {
	return "processing";
};

const getLastStatus = (fullJobApplication: FullJobApplication): string => {
	const lines = qstr.convertStringBlockToLines(fullJobApplication.history);
	// qdev.log('jobApplicationsRouter.ts:32', 'lines', lines);
	if (lines.length > 0) {
		const lastLine = lines[lines.length - 1];
		const parts = qstr.breakIntoParts(lastLine, ";");
		const lastStatus = parts[1];
		return lastStatus;
	} else {
		return "PLEASE ENTER STATUS IN HISTORY";
	}
};

const getApplicationCreateText = (): string => {
	return `
==jobApplication
dpodId::Y8jOaY
baseJobId::
language::
letterDate::
skillTextsBlock::
customText::
customOutlineText::
contactFullName::
contactGender::
contactEmail::
contactAddress::
salaryFrom::
salaryTo::
earliestStartDate::
closingParagraph::
history::
	`.trim();
}

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications: OverviewJobApplication[] = [];
	for (const job of jobs) {
		const fullJobApplication = fullJobApplications.find((m) => {
			return m.baseJobId === job.id;
		});
		if (fullJobApplication) {
			const overviewJobApplication: OverviewJobApplication = {
				job,
				fullJobApplication,
				kind: getKind(),
				lastStatus: getLastStatus(fullJobApplication),
				applicationCreateText: "",
			};
			overviewJobApplications.push(overviewJobApplication);
		} else {
			const overviewJobApplication: OverviewJobApplication = {
				job,
				fullJobApplication,
				kind: "todo",
				lastStatus: "",
				applicationCreateText: getApplicationCreateText()
			};
			overviewJobApplications.push(overviewJobApplication);
		}
	}
	res.json(overviewJobApplications);
});
