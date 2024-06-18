/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import cors from "cors";
import { IAppData } from "../../share/interfaces.js";
import * as qfil from "../../share/qtools/qfil.js";
import * as apptools from "../apptools.js";
import * as appconfig from "../appconfig.js";
import { DpodDataLoader } from "../classes/DpodDataLoader.js";
import { zodShowcaseRouter } from "./routers/zodShowcaseRouter";
import { jobApplicationsRouter } from "./routers/jobApplicationsRouter.js";

export const app = express();
app.use(cors());

app.use("/zod-showcase", zodShowcaseRouter);
app.use("/job-applications", jobApplicationsRouter);
 
app.get("/", (_req, res) => {
	res.status(200).json({ message: "api works" });
});

app.get("/appdata", (_req, res) => {
	const pathAndFileNames = qfil.getFileNamesInDirectory(
		appconfig.importDirectory()
	);
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);

	const appJsonData: IAppData = {
		appIdCode: appconfig.appIdCode(),
		frontendPort: appconfig.frontendPort(),
		backendPort: appconfig.backendPort(),
		fileObjects,
		entireContent,
		lineBlockDataItems: dpodDataLoader.getLineBlockDataItems(),
		dpodSchemaDataItems: dpodDataLoader.getDpodSchemaDataItems(),
		dpodItemGroupDataItems: dpodDataLoader.getDpodItemGroupDataItems(),
		quickApplications: apptools.buildQuickApplications(),
		overviewListText: apptools.buildOverviewListText()
	};
	res.json(appJsonData);
});

app.get("/parse-etsite-data", (req, res) => {
	const etSiteBase = appconfig.etsiteDataRelativePathAndFileName();
	const pathAndFileNames = qfil.getFileNamesInDirectory(
		appconfig.importDirectory()
	);
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);
	const dataItems = dpodDataLoader.getDpodItemGroupDataItems();
	qfil.createFile(
		`${etSiteBase}/itemType-runs.json`,
		qfil.wrapAsArrayForJson((dataItems[0] as any).jsonData)
	);
	qfil.createFile(
		`${etSiteBase}/itemType-swims.json`,
		qfil.wrapAsArrayForJson((dataItems[1] as any).jsonData)
	);
	qfil.createFile(
		`${etSiteBase}/itemType-weights.json`,
		qfil.wrapAsArrayForJson((dataItems[2] as any).jsonData)
	);

	res.status(200);
});

