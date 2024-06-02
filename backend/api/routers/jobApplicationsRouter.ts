/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as model from "../models/jobApplicationsModel.js";
import {
	ApplicationDay,
	GroupedApplicationDayReport,
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

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	res.json(overviewJobApplications);
});

jobApplicationsRouter.get("/grouped-application-day-report", (_req, res) => {
	const overviewJobApplications = model.getOverviewApplications();
	overviewJobApplications.sort((a, b) =>
		a.letterDate < b.letterDate ? 1 : -1
	);
	const days: ApplicationDay[] = [];
	for (const overviewJobApplication of overviewJobApplications) {
		if (overviewJobApplication.letterDate.trim() !== "") {
			const day: ApplicationDay = {
				title: overviewJobApplication.job.title,
				company: overviewJobApplication.job.company,
				letterDate: overviewJobApplication.letterDate,
			};
			days.push(day);
		}
	}

	const groupedApplicationDayReport: GroupedApplicationDayReport = days.reduce((acc, day) => {
		const date = day.letterDate.split(" ")[0];
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(day);
		return acc;
	}, {});

	res.json(groupedApplicationDayReport);
});
