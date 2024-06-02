/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
// import * as qdev from "../../../share/qtools/qdev.js";

const jobs = model.getJobs();

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(jobs);
});

jobApplicationsRouter.get("/jobApplications", (_req, res) => {
	const jobApplications = model.getJobApplications();
	res.json(jobApplications);
});

jobApplicationsRouter.get("/fullJobApplications", (_req, res) => {
	const fullJobApplications = model.getFullJobApplications();
	res.json(fullJobApplications);
});

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	res.json(overviewJobApplications);
});

jobApplicationsRouter.get("/grouped-application-day-report", (_req, res) => {
	const groupedApplicationDayReport = model.getGroupedApplicationDayReport();
	res.json(groupedApplicationDayReport);
});
