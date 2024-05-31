/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import {
	FullJobApplication,
	OverviewJobApplication,
	OverviewJobApplicationKind,
} from "../../../share/interfaces.js";
// import * as qdev from "../../../share/qtools/qdev.js";

const jobs = model.getJobs();
const fullJobApplications = model.getFullJobApplications();

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(jobs);
});

jobApplicationsRouter.get("/fullJobApplications", (_req, res) => {
	res.json(fullJobApplications);
});

const getKind = (
	fullJobApplication: FullJobApplication | undefined
): OverviewJobApplicationKind => {
	if (fullJobApplication) {
		return "processing";
	} else {
		return "todo";
	}
};

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications: OverviewJobApplication[] = [];
	for (const job of jobs) {
		const fullJobApplication = fullJobApplications.find((m) => {
			return m.baseJobId === job.id;
		});
		const overviewJobApplication: OverviewJobApplication = {
			job,
			fullJobApplication,
			kind: getKind(fullJobApplication),
			lastStatus: 'LAST STATUS'
		};
		overviewJobApplications.push(overviewJobApplication);
	}
	res.json(overviewJobApplications);
});
