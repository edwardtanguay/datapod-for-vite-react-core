/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
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

// const getKind = ( fullJobApplication: FullJobApplication): OverviewJobApplicationKind => {
jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	res.json(overviewJobApplications);
});
