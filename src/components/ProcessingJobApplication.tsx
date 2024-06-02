import React, { useContext, useEffect, useState } from "react";
import { OverviewJobApplication } from "../../share/interfaces";
import { AppContext } from "../AppContext";

interface IProps {
	currentJobApplication: OverviewJobApplication;
}

export const ProcessingJobApplication = ({ currentJobApplication }: IProps) => {
	const { currentlyCreatingApplication } = useContext(AppContext);
	const [showingContent, setShowingContent] = useState(false);
	const [showingHistory, setShowingHistory] = useState(false);

	const closeAllSections = () => {
		setShowingContent(false);
		setShowingHistory(false);
	};

	const handleToggleShowingContent = () => {
		closeAllSections();
		setShowingContent(!showingContent);
	};

	const handleToggleShowingHistory = () => {
		closeAllSections();
		setShowingHistory(!showingHistory);
	};

	const somethingIsOpen = () => {
		return showingContent || showingHistory;
	};

	useEffect(() => {
		if (
			currentlyCreatingApplication &&
			(currentJobApplication.lastStatus === "creating..." ||
				currentJobApplication.lastStatus === "proofreading...")
		) {
			setShowingContent(true);
		}
	}, []);

	return (
		<React.Fragment>
			<header className="bg-slate-500 px-4 pt-4 rounded-t-lg w-[60rem] flex justify-between">
				<section>
					<p className="text-xl">{currentJobApplication.job.title}</p>
					<p className="italic">
						<span>{currentJobApplication.job.company}</span>{" "}
						<span className="text-gray-700 font-mono text-xs not-italic">
							({currentJobApplication.job.id})
						</span>
					</p>
					<p
						className="italic text-sm text-orange-950"
						style={{
							color:
								currentJobApplication.lastStatus ===
									"creating..." ||
								currentJobApplication.lastStatus ===
									"proofreading..."
									? "yellow"
									: "black",
						}}
					>
						{currentJobApplication.lastStatus}
					</p>
				</section>
				<section className="flex flex-col justify-between w-[20rem]">
					<div className="flex justify-end">
						{currentJobApplication.fullJobApplication && (
							<a
								href={
									currentJobApplication.fullJobApplication
										.jobAnnouncementUrl
								}
								className="underline"
								target="_blank"
							>
								online job announcement
							</a>
						)}
					</div>
					<div className="flex justify-end pt-1">
						<button
							className="generic2 mr-1"
							onClick={handleToggleShowingHistory}
						>
							History
						</button>
						<button
							className="generic2"
							onClick={handleToggleShowingContent}
						>
							Cover Letter
						</button>
					</div>
				</section>
			</header>
			{somethingIsOpen() ? (
				<div className="outlineInJobApplication">
					{showingHistory && (
						<section className="bg-slate-500 w-[60rem] rounded-b-lg p-4 mb-3">
							<span
								dangerouslySetInnerHTML={{
									__html: currentJobApplication.fullJobApplication
										? currentJobApplication
												.fullJobApplication.historyHtml
										: "",
								}}
							></span>
						</section>
					)}
					{showingContent && (
						<section className="bg-slate-500 w-[60rem] rounded-b-lg p-4 mb-3">
							{currentJobApplication.fullJobApplication && (
								<div className="scrollable-container h-[40rem] bg-gray-300 w-full">
									<div className="scrollable-content">
										<div>
											Berlin,{" "}
											{
												currentJobApplication
													.fullJobApplication
													.letterDateText
											}
										</div>
										<div>&nbsp;</div>
										<div>&nbsp;</div>
										<div>Edward Tanguay</div>
										<div>Lacknerstr. 8</div>
										<div>12167 Berlin</div>
										<div>
											Tel: 030 / 795 55 99,{" "}
											{
												currentJobApplication
													.fullJobApplication
													.nameForCellPhone
											}
											: 0179 / 66 486 04
										</div>
										<div>E-Mail: edward@tanguay.info</div>
										<div>&nbsp;</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication.company
											}
										</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.contactSalutation
											}
										</div>
										{currentJobApplication.fullJobApplication.companyAddressLines.map(
											(companyAddressLine, index) => {
												return (
													<div key={index}>
														{companyAddressLine}
													</div>
												);
											}
										)}
										<div>&nbsp;</div>
										<div>
											<b>
												{
													currentJobApplication
														.fullJobApplication
														.headerLine1
												}
											</b>
										</div>
										<div>
											<b>
												{
													currentJobApplication
														.fullJobApplication
														.headerLine2
												}
											</b>
										</div>
										<div>&nbsp;</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.greetingLine
											}
										</div>
										<div>&nbsp;</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.applicationLine
											}
										</div>
										<div>&nbsp;</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.skillIntroLine
											}
										</div>
										<div>&nbsp;</div>
										{currentJobApplication.fullJobApplication.skillAndResponseBlocks.map(
											(srb, index) => {
												return (
													<React.Fragment key={index}>
														<div key={index}>
															<b>
																<i>
																	{
																		srb.skillLine
																	}
																</i>
															</b>{" "}
															<span
																dangerouslySetInnerHTML={{
																	__html: srb.responseHtml,
																}}
															></span>
														</div>
														<div>&nbsp;</div>
													</React.Fragment>
												);
											}
										)}
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.customText
											}
										</div>
										{currentJobApplication
											.fullJobApplication
											.closingParagraph && (
											<>
												<div>
													{
														currentJobApplication
															.fullJobApplication
															.closingParagraph
													}
												</div>
												<div>&nbsp;</div>
											</>
										)}
										<div>
											<span
												dangerouslySetInnerHTML={{
													__html: currentJobApplication
														.fullJobApplication
														.customOutlineHtml,
												}}
											></span>
										</div>
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.attachmentText1
											}
											:
										</div>
										<ul className="list-disc ml-6 mb-6">
											<li>
												<a
													className="underline"
													target="_blank"
													href="http://www.tanguay.info/cv"
												>
													http://www.tanguay.info/cv
												</a>{" "}
												(
												{
													currentJobApplication
														.fullJobApplication
														.attachmentText2
												}
												)
											</li>
											<li>
												<a
													className="underline"
													target="_blank"
													href="http://www.tanguay.info/cv/attachments"
												>
													http://www.tanguay.info/cv/attachments
												</a>{" "}
												(
												{
													currentJobApplication
														.fullJobApplication
														.attachmentText3
												}
												)
											</li>
										</ul>
										{currentJobApplication
											.fullJobApplication.salaryText && (
											<div>
												{
													currentJobApplication
														.fullJobApplication
														.salaryText
												}
											</div>
										)}
										{currentJobApplication
											.fullJobApplication
											.startDateLine && (
											<>
												<div>
													{
														currentJobApplication
															.fullJobApplication
															.startDateLine
													}
												</div>
												<div>&nbsp;</div>
											</>
										)}
										<div>
											{
												currentJobApplication
													.fullJobApplication
													.closingPhrase
											}
										</div>
										<div>&nbsp;</div>
										<div>Edward Tanguay</div>
									</div>
								</div>
							)}
						</section>
					)}
				</div>
			) : (
				<section className="bg-slate-500 w-[60rem] rounded-b-lg p-2 mb-3"></section>
			)}
		</React.Fragment>
	);
};
