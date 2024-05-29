import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageJobApplications = () => {
	const { fullJobApplications } = useContext(AppContext);

	return (
		<>
			<p className="mb-3">
				There are {fullJobApplications.length} applications:
			</p>
			{fullJobApplications.map((fullJobApplication) => {
				return (
					<>
						<header className="bg-slate-500 px-4 pt-4 rounded-t-lg w-1/2 flex justify-between">
							<section>
								<p className="text-xl">
									{fullJobApplication.jobTitle}
								</p>
								<p className="italic">
									{fullJobApplication.company}
								</p>
							</section>
							<section>
								<a href={fullJobApplication.jobAnnouncementUrl} className="underline" target="_blank">online job announcement</a>
							</section>
						</header>
						<section className="bg-slate-500 w-1/2 rounded-b-lg p-4">
							<div className="scrollable-container h-[40rem] bg-gray-300 w-full">
								<div className="scrollable-content">
									<div>
										Berlin,{" "}
										{fullJobApplication.letterDateText}
									</div>
									<div>&nbsp;</div>
									<div>&nbsp;</div>
									<div>Edward Tanguay</div>
									<div>Lacknerstr. 8</div>
									<div>12167 Berlin</div>
									<div>
										Tel: 030 / 795 55 99,{" "}
										{fullJobApplication.nameForCellPhone}:
										0179 / 66 486 04
									</div>
									<div>E-Mail: edward@tanguay.info</div>
									<div>&nbsp;</div>
									<div>{fullJobApplication.company}</div>
									<div>
										{fullJobApplication.contactSalutation}
									</div>
									{fullJobApplication.companyAddressLines.map(
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
										<b>{fullJobApplication.headerLine1}</b>
									</div>
									<div>
										<b>{fullJobApplication.headerLine2}</b>
									</div>
									<div>&nbsp;</div>
									<div>{fullJobApplication.greetingLine}</div>
									<div>&nbsp;</div>
									<div>
										{fullJobApplication.applicationLine}
									</div>
									<div>&nbsp;</div>
									<div>
										{fullJobApplication.skillIntroLine}
									</div>
									<div>&nbsp;</div>
									{fullJobApplication.skillAndResponseBlocks.map(
										(srb, index) => {
											return (
												<>
													<div key={index}>
														<b>{srb.skillLine}</b>{" "}
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
									<div>{fullJobApplication.customText}</div>
									<div>
										<span
											dangerouslySetInnerHTML={{
												__html: fullJobApplication.customOutlineHtml,
											}}
										></span>
									</div>
									<div>
										{fullJobApplication.attachmentText1}:
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
											{fullJobApplication.attachmentText2}
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
											{fullJobApplication.attachmentText3}
											)
										</li>
									</ul>
									{fullJobApplication.salaryText && (
										<div>
											{fullJobApplication.salaryText}
										</div>
									)}
									{fullJobApplication.startDateLine && (
										<div>
											{fullJobApplication.startDateLine}
										</div>
									)}
									<div>&nbsp;</div>
									<div>{fullJobApplication.closingLine}</div>
									<div>&nbsp;</div>
									<div>Edward Tanguay</div>
								</div>
							</div>
						</section>
					</>
				);
			})}
		</>
	);
};
