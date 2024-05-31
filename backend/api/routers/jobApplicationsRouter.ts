/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import {
	FullJobApplication,
	OverviewJobApplication,
	OverviewJobApplicationKind,
} from "../../../share/interfaces.js";
import * as qdev from "../../../share/qtools/qdev.js";

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
	return "test last status: " + fullJobApplication.baseJobId;
};

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
			};
			overviewJobApplications.push(overviewJobApplication);
		} else {
			const overviewJobApplication: OverviewJobApplication = {
				job,
				fullJobApplication,
				kind: "todo",
				lastStatus: "",
			};
			overviewJobApplications.push(overviewJobApplication);
		}
	}
	res.json(overviewJobApplications);
});
