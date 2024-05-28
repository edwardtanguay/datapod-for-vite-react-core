import { Router } from "express";
import * as apptools from "../../apptools.js";
import * as qfil from "../../../share/qtools/qfil.js";
import * as qdat from "../../../share/qtools/qdat.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
// import * as qdev from "../../../share/qtools/qdev.js";
import { FullJobApplication, JobApplication } from "../../../share/interfaces.js";
import jobs from "../../data/jobs.json";

export const jobApplicationsRouter = Router();

const buildContactSaluation = (jobApplication: JobApplication) => {
	return 'nnnFromfunction';
};

jobApplicationsRouter.get("/full", (_req, res) => {
	const pathAndFileNames = qfil.getFileNamesInDirectory(
		appconfig.importDirectory()
	);
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);
	const dpodItemGroupDataItems = dpodDataLoader.getDpodItemGroupDataItems();
	const jobApplicationsGroup = dpodItemGroupDataItems.find(
		(m) => m.idCode === "jobApplications"
	);
	if (jobApplicationsGroup) {
		const jsonData = jobApplicationsGroup.jsonData;
		const jobApplications: JobApplication[] = JSON.parse(jsonData);
		const fullJobApplications: FullJobApplication[] = [];
		for (const jobApplication of jobApplications) {
			const job = jobs.find((m) => m.id === jobApplication.baseJobId);
			if (job) {
				const fullJobApplication: FullJobApplication = {
					language: jobApplication.language,
					baseJobId: jobApplication.baseJobId,
					letterDateText: qdat.getCurrentAmericanDate(
						jobApplication.letterDate
					),
					contactSalutation: buildContactSaluation(jobApplication),
					jobTitle: job.title,
					company: job.company,
				};
				fullJobApplications.push(fullJobApplication);
			}
		}
		res.json(fullJobApplications);
	} else {
		throw new Error("error: no job applications");
	}
});
