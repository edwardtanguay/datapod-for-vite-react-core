/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import { OverviewJobApplications } from "../../../share/interfaces.js";

const jobs = model.getJobs();
const fullJobApplications = model.getFullJobApplications();

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(jobs);
});

jobApplicationsRouter.get("/full", (_req, res) => {
	res.json(fullJobApplications);
});

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications: OverviewJobApplications[] = [];
	for (const job of jobs) {
		const overviewJobApplication: OverviewJobApplications = {
			job,
			fullJobApplication: fullJobApplications.find(
				(m) => m.baseJobId === job.id
			),
			status: "todo",
		};
		overviewJobApplications.push(overviewJobApplication);
	}
	res.json(overviewJobApplications);
});
