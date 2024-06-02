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

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	res.json(overviewJobApplications);
});

jobApplicationsRouter.get("/applications-sent-by-day", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	overviewJobApplications.sort((a, b) =>
		a.letterDate < b.letterDate ? 1 : -1
	);
	const days: any[] = [];
	for (const overviewJobApplication of overviewJobApplications) {
		if (overviewJobApplication.letterDate.trim() !== "") {
			const day: any = {
				title: overviewJobApplication.job.title,
				company: overviewJobApplication.job.company,
				letterDate: overviewJobApplication.letterDate,
			};
			days.push(day);
		}
	}

	const groupedJobs = days.reduce((acc, job) => {
		const date = job.letterDate.split(" ")[0];
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(job);
		return acc;
	}, {});
	res.json(groupedJobs);
});
