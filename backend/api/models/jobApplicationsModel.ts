import { Job, JobApplication } from "../../../share/interfaces";
import * as apptools from "../../apptools.js";
import * as appconfig from "../../appconfig.js";
import { DpodDataLoader } from "../../classes/DpodDataLoader.js";
import _jobs from "../../data/jobs.json";
import * as qfil from "../../../share/qtools/qfil.js";

// jobs (from online JSON file)
export const getJobs = (): Job[] => {
	const jobs: Job[] = _jobs;
	return jobs;
};

// jobApplications (Datapod type)
export const getJobApplications = (): JobApplication[] => {
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
		return jobApplications;
	} else {
		return [] as JobApplication[];
	}
};
