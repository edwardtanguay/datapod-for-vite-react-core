/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { OverviewJobApplication } from "../../share/interfaces";
import React from "react";

type ShowGroup = "todo" | "processing" | "closed";

export const PageJobApplications = () => {
	const {
		todoJobApplications,
		processingJobApplications,
		closedJobApplications,
	} = useContext(AppContext);
	const [overviewJobApplications, setOverviewJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [currentShowGroup, setCurrentShowGroup] = useState<ShowGroup>("todo");
	const defaultSelection = useRef<HTMLInputElement>(null);

	const handleShowTodoApplications = () => {
		console.log("todo");
		setOverviewJobApplications(structuredClone(todoJobApplications));
		setCurrentShowGroup("todo");
	};

	const handleShowProcessingApplications = () => {
		setOverviewJobApplications(structuredClone(processingJobApplications));
		setCurrentShowGroup("processing");
	};

	const handleShowClosedApplications = () => {
		setOverviewJobApplications(structuredClone(closedJobApplications));
		setCurrentShowGroup("closed");
	};

	useEffect(() => {
		handleShowTodoApplications();
	}, [todoJobApplications]);

	return (
		<>
			<p className="mb-3">currentShowGroup = {currentShowGroup}</p>
			<p className="mb-3">
				There are {overviewJobApplications.length} todo applications:
			</p>
			<p className="mb-3">
				There are {todoJobApplications.length} todo applications:
			</p>
			<p className="mb-3">
				There are {processingJobApplications.length} processing
				applications:
			</p>
			<p className="mb-3">
				There are {closedJobApplications.length} closed applications:
			</p>
			<main>
				<section>
					<div className="flex space-x-4">
						<label className="inline-flex cursor-pointer align-middle">
							<input
								type="radio"
								className="form-radio"
								name="status"
								value="todo"
								checked={currentShowGroup === "todo"}
								ref={defaultSelection}
								onChange={() => handleShowTodoApplications()}
							/>
							<span className="ml-1 mb-1">Todo</span>
						</label>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								className="form-radio"
								name="status"
								value="processing"
								checked={currentShowGroup === "processing"}
								onChange={() =>
									handleShowProcessingApplications()
								}
							/>
							<span className="ml-1 mb-1">Processing</span>
						</label>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								className="form-radio"
								name="status"
								value="closed"
								checked={currentShowGroup === "closed"}
								onChange={() => handleShowClosedApplications()}
							/>
							<span className="ml-1 mb-1">Closed</span>
						</label>
					</div>
				</section>
				{overviewJobApplications.map(
					(overviewJobApplication, index) => {
						return (
							<React.Fragment key={index}>
								<header className="bg-slate-500 px-4 pt-4 rounded-t-lg w-1/2 flex justify-between">
									<section>
										<p className="text-xl">
											{overviewJobApplication.job.title}
										</p>
										<p className="italic">
											<span>
												{
													overviewJobApplication.job
														.company
												}
											</span>{" "}
											<span className="text-gray-700 font-mono text-xs not-italic">
												({overviewJobApplication.job.id}
												)
											</span>
										</p>
									</section>
									{overviewJobApplication.fullJobApplication && (
										<section>
											<a
												href={
													overviewJobApplication
														.fullJobApplication
														.jobAnnouncementUrl
												}
												className="underline"
												target="_blank"
											>
												online job announcement
											</a>
										</section>
									)}
								</header>
								{overviewJobApplication.fullJobApplication && (
									<section className="bg-slate-500 w-1/2 rounded-b-lg p-4 mb-6">
										<div className="scrollable-container h-[40rem] bg-gray-300 w-full">
											<div className="scrollable-content">
												<div>
													Berlin,{" "}
													{
														overviewJobApplication
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
														overviewJobApplication
															.fullJobApplication
															.nameForCellPhone
													}
													: 0179 / 66 486 04
												</div>
												<div>
													E-Mail: edward@tanguay.info
												</div>
												<div>&nbsp;</div>
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.company
													}
												</div>
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.contactSalutation
													}
												</div>
												{overviewJobApplication.fullJobApplication.companyAddressLines.map(
													(
														companyAddressLine,
														index
													) => {
														return (
															<div key={index}>
																{
																	companyAddressLine
																}
															</div>
														);
													}
												)}
												<div>&nbsp;</div>
												<div>
													<b>
														{
															overviewJobApplication
																.fullJobApplication
																.headerLine1
														}
													</b>
												</div>
												<div>
													<b>
														{
															overviewJobApplication
																.fullJobApplication
																.headerLine2
														}
													</b>
												</div>
												<div>&nbsp;</div>
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.greetingLine
													}
												</div>
												<div>&nbsp;</div>
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.applicationLine
													}
													fullJobApplication.
												</div>
												<div>&nbsp;</div>
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.skillIntroLine
													}
												</div>
												<div>&nbsp;</div>
												{overviewJobApplication.fullJobApplication.skillAndResponseBlocks.map(
													(srb, index) => {
														return (
															<React.Fragment
																key={index}
															>
																<div
																	key={index}
																>
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
																<div>
																	&nbsp;
																</div>
															</React.Fragment>
														);
													}
												)}
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.customText
													}
												</div>
												{overviewJobApplication
													.fullJobApplication
													.closingParagraph && (
													<>
														<div>
															{
																overviewJobApplication
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
															__html: overviewJobApplication
																.fullJobApplication
																.customOutlineHtml,
														}}
													></span>
												</div>
												<div>
													{
														overviewJobApplication
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
															overviewJobApplication
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
															overviewJobApplication
																.fullJobApplication
																.attachmentText3
														}
														)
													</li>
												</ul>
												{overviewJobApplication
													.fullJobApplication
													.salaryText && (
													<div>
														{
															overviewJobApplication
																.fullJobApplication
																.salaryText
														}
													</div>
												)}
												{overviewJobApplication
													.fullJobApplication
													.startDateLine && (
													<>
														<div>
															{
																overviewJobApplication
																	.fullJobApplication
																	.startDateLine
															}
														</div>
														<div>&nbsp;</div>
													</>
												)}
												<div>
													{
														overviewJobApplication
															.fullJobApplication
															.closingPhrase
													}
												</div>
												<div>&nbsp;</div>
												<div>Edward Tanguay</div>
											</div>
										</div>
									</section>
								)}
							</React.Fragment>
						);
					}
				)}
			</main>
		</>
	);
};
