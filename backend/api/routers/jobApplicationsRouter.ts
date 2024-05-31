/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import { OverviewJobApplication } from "../../../share/interfaces.js";

const jobs = model.getJobs();
const fullJobApplications = model.getFullJobApplications();

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(jobs);
});

jobApplicationsRouter.get("/fullJobApplications", (_req, res) => {
	res.json(fullJobApplications);
});

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications: OverviewJobApplication[] = [];
	for (const job of jobs) {
		const overviewJobApplication: OverviewJobApplication = {
			job,
			fullJobApplication: fullJobApplications.find(
				(m) => m.baseJobId === job.id
			),
			status: "closed",
		};
		overviewJobApplications.push(overviewJobApplication);
	}
	res.json(overviewJobApplications);
});
