import { Router } from "express";

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/full", (_req, res) => {
	const jobApplications = [
		{
			title: "jobapp1"
		},
		{
			title: "jobapp2"
		}
	]
	res.json(jobApplications);
});

