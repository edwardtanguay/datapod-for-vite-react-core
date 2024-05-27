import { Router } from "express";
import * as apptools from "../../apptools.js";
import * as qfil from "../../../share/qtools/qfil.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
import * as qdev from "../../../share/qtools/qdev.js";

export const jobApplicationsRouter = Router();

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
		const jobApplications = JSON.parse(jsonData);
		qdev.log(
			"jobApplicationsRouter.ts",
			"jobApplications number",
			jobApplications.length
		);
		res.json(jobApplications);
	} else {
		throw new Error('error: no job applications');
	}
});
