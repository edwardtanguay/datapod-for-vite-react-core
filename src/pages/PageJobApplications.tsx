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
					<header className="bg-slate-500 p-4 rounded w-1/2">
						<p className="text-xl">{fullJobApplication.jobTitle}</p>
						<p className="italic mb-2">
							{fullJobApplication.company}
						</p>
						<div className="scrollable-container rounded w-full h-[40rem] bg-gray-300">
							<div className="scrollable-content">
								<div>
									Berlin, {fullJobApplication.letterDateText}
								</div>
								<div>&nbsp;</div>
								<div>&nbsp;</div>
								<div>Edward Tanguay</div>
								<div>Lacknerstr. 8</div>
								<div>12167 Berlin</div>
								<div>
									Tel: 030 / 795 55 99,{" "}
									{fullJobApplication.nameForCellPhone}: 0179
									/ 66 486 04
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
								<div>{fullJobApplication.applicationLine}</div>
								<div>&nbsp;</div>
								<div>{fullJobApplication.skillIntroLine}</div>
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
								<div>{fullJobApplication.attachmentText1}:</div>
								<ul className="list-disc ml-6 mb-6">
									<li>
										<a
											className="underline"
											target="_blank"
											href="http://www.tanguay.info/cv"
										>
											http://www.tanguay.info/cv
										</a>{" "}
										({fullJobApplication.attachmentText2})
									</li>
									<li>
										<a
											className="underline"
											target="_blank"
											href="http://www.tanguay.info/cv/attachments"
										>
											http://www.tanguay.info/cv/attachments
										</a>{" "}
										({fullJobApplication.attachmentText3})
									</li>
								</ul>
								<div>{fullJobApplication.salaryText}</div>
								<div>
									Mein frühester Eintrittstermin ist der 01.
									März 2018.
								</div>
								<div>&nbsp;</div>
								<div>Mit freundlichen Grüßen</div>
								<div>&nbsp;</div>
								<div>Edward Tanguay</div>
							</div>
						</div>
					</header>
				);
			})}
		</>
	);
};
