/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import * as qstr from "../../../share/qtools/qstr.js";
import * as model from "../models/jobApplicationsModel.js";
import * as tools from "../tools/jobApplicationsTools.js";
import {
	FullJobApplication,
} from "../../../share/interfaces.js";

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/jobs", (_req, res) => {
	res.json(model.getJobs());
});

jobApplicationsRouter.get("/full", (_req, res) => {
	const fullJobApplications: FullJobApplication[] = [];
	for (const jobApplication of model.getJobApplications()) {
		const [attachmentText1, attachmentText2, attachmentText3] =
			tools.getAttachmentTexts(jobApplication);
		const job = model
			.getJobs()
			.find((m) => m.id === jobApplication.baseJobId);
		if (job) {
			const fullJobApplication: FullJobApplication = {
				language: jobApplication.language,
				baseJobId: jobApplication.baseJobId,
				letterDateText: tools.getLetterDateText(jobApplication),
				letterDate: jobApplication.letterDate,
				contactSalutation: tools.buildContactSaluation(jobApplication),
				jobTitle: job.title,
				company: job.company,
				nameForCellPhone: tools.getNameForCellPhone(jobApplication),
				companyAddressLines: tools.getAddressLines(jobApplication),
				headerLine1: tools.getHeaderLine1(job, jobApplication),
				headerLine2: tools.getHeaderLine2(job, jobApplication),
				greetingLine: tools.getGreetingLine(jobApplication),
				applicationLine: tools.getApplicationLine(job, jobApplication),
				skillIntroLine: tools.getSkillIntroLine(jobApplication),
				skillAndResponseBlocks:
					tools.getSkillAndResponseBlocks(jobApplication),
				customText: jobApplication.customText,
				customOutlineHtml: qstr.buildOutlineHtml(
					jobApplication.customOutlineText
				),
				attachmentText1,
				attachmentText2,
				attachmentText3,
				salaryText: tools.getSalaryText(jobApplication),
				startDateLine: tools.getStartDateLine(jobApplication),
				closingParagraph: tools.getClosingParagraph(jobApplication),
				closingPhrase: tools.getClosingPhrase(jobApplication),
				jobAnnouncementUrl: job.url,
			};
			fullJobApplications.push(fullJobApplication);
		}
	}
	res.json(fullJobApplications);
});

jobApplicationsRouter.get("/overviewJobApplications", (_req, res) => {
	const overviewJobApplications = [
		{
			test: "111",
		},
		{
			test: "222",
		},
		{
			test: "333",
		},
	];
	res.json(overviewJobApplications);
});
