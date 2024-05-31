import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageJobApplications = () => {
	const { fullJobApplications, overviewJobApplications, todoJobApplications } =
		useContext(AppContext);

	return (
		<>
			<p className="mb-3">
				There are {fullJobApplications.length} applications:
			</p>
			<p className="mb-3">
				There are {overviewJobApplications.length} overview
				applications:
			</p>
			<p className="mb-3">
				There are {todoJobApplications.length} todo
				applications:
			</p>
			{overviewJobApplications.map((overviewJobApplication) => {
				return (
					<>
						<header className="bg-slate-500 px-4 pt-4 rounded-t-lg w-1/2 flex justify-between">
							<section>
								<p className="text-xl">
									{overviewJobApplication.job.title}
								</p>
								<p className="italic">
									<span>
										{overviewJobApplication.job.company}
									</span>{" "}
									<span className="text-gray-700 font-mono text-xs not-italic">
										({overviewJobApplication.job.id})
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
												overviewJobApplication.fullJobApplication.letterDateText
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
												overviewJobApplication.fullJobApplication.nameForCellPhone
											}
											: 0179 / 66 486 04
										</div>
										<div>E-Mail: edward@tanguay.info</div>
										<div>&nbsp;</div>
										<div>
											{overviewJobApplication.fullJobApplication.company}
										</div>
										<div>
											{
												overviewJobApplication.fullJobApplication.contactSalutation
											}
										</div>
										{overviewJobApplication.fullJobApplication.companyAddressLines.map(
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
													overviewJobApplication.fullJobApplication.headerLine1
												}
											</b>
										</div>
										<div>
											<b>
												{
													overviewJobApplication.fullJobApplication.headerLine2
												}
											</b>
										</div>
										<div>&nbsp;</div>
										<div>
											{
												overviewJobApplication.fullJobApplication.greetingLine
											}
										</div>
										<div>&nbsp;</div>
										<div>
											{
												overviewJobApplication.fullJobApplication.applicationLine
											}fullJobApplication.
										</div>
										<div>&nbsp;</div>
										<div>
											{
												overviewJobApplication.fullJobApplication.skillIntroLine
											}
										</div>
										<div>&nbsp;</div>
										{overviewJobApplication.fullJobApplication.skillAndResponseBlocks.map(
											(srb, index) => {
												return (
													<>
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
													</>
												);
											}
										)}
										<div>
											{overviewJobApplication.fullJobApplication.customText}
										</div>
										{overviewJobApplication.fullJobApplication.closingParagraph && (
											<>
												<div>
													{
														overviewJobApplication.fullJobApplication.closingParagraph
													}
												</div>
												<div>&nbsp;</div>
											</>
										)}
										<div>
											<span
												dangerouslySetInnerHTML={{
													__html: overviewJobApplication.fullJobApplication.customOutlineHtml,
												}}
											></span>
										</div>
										<div>
											{
												overviewJobApplication.fullJobApplication.attachmentText1
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
													overviewJobApplication.fullJobApplication.attachmentText2
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
													overviewJobApplication.fullJobApplication.attachmentText3
												}
												)
											</li>
										</ul>
										{overviewJobApplication.fullJobApplication.salaryText && (
											<div>
												{
													overviewJobApplication.fullJobApplication.salaryText
												}
											</div>
										)}
										{overviewJobApplication.fullJobApplication.startDateLine && (
											<>
												<div>
													{
														overviewJobApplication.fullJobApplication.startDateLine
													}
												</div>
												<div>&nbsp;</div>
											</>
										)}
										<div>
											{
												overviewJobApplication.fullJobApplication.closingPhrase
											}
										</div>
										<div>&nbsp;</div>
										<div>Edward Tanguay</div>
									</div>
								</div>
							</section>
						)}
					</>
				);
			})}
		</>
	);
};
