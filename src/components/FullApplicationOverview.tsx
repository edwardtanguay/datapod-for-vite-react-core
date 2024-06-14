import { useContext } from "react";
import { AppContext } from "../AppContext";
import * as qdat from "../../share/qtools/qdat";

export const FullApplicationOverview = () => {
	const { fullReport } = useContext(AppContext);
	return (
		<section>
			<>
				<h2 className="text-xl">
					{fullReport.totalApplications} total applications sent in{" "}
					{fullReport.totalDays} days{" "}
					<span className="text-sm">
						(average per day ={" "}
						{fullReport.averageApplicationsPerDay})
					</span>
				</h2>
				<h3 className="mb-3 italic">
					{fullReport.numberActive} active,{" "}
					<span className="text-red-900">
						{fullReport.numberOfRejections} rejected
					</span>{" "}
					<span>
						(rejection rate:{" "}
						<span className="text-red-900">
							{(fullReport.rejectionRate * 100).toFixed(2)}%
						</span>
						)
					</span>
				</h3>
				{Object.entries(fullReport.groupedApplicationDayReport).map(
					(kv, index) => {
						const day = kv[0];
						const applications = kv[1];
						return (
							<div key={day}>
								<div
									key={index}
									className="font-semibold bg-slate-300 px-1 rounded"
								>
									{qdat.getNiceAmericanShortDate(day)}
								</div>
								<ul className="list-disc ml-6 mb-2 pt-1">
									{applications.map((application, index) => {
										return (
											<>
												{application.speedKind ===
												"coverLetterApplication" ? (
													<li key={index}>
														{application.processStatus ===
															"doing" && (
															<span className="text-green-900 italic font-semibold">
																...in process...{" "}
															</span>
														)}
														<span
															className={
																application.processStatus ===
																"rejected"
																	? "text-red-700 line-through"
																	: ""
															}
														>
															<span className="font-semibold text-black">
																{
																	application.title
																}
															</span>{" "}
															<span className="italic text-slate-700">
																-{" "}
																{
																	application.company
																}
															</span>
														</span>
													</li>
												) : (
													<li key={index}>
														{application.processStatus ===
															"doing" && (
															<span className="text-green-900 italic font-semibold">
																...in process...{" "}
															</span>
														)}
														<span
															className={
																application.processStatus ===
																"rejected"
																	? "text-red-700 line-through"
																	: ""
															}
														>
															<span className="bg-gray-500 text-gray-100 px-1 text-sm italic rounded">
																quick
																application
															</span>{" "}
															<span className="italic text-slate-700">
																{
																	application.company
																}
															</span>
														</span>
													</li>
												)}
											</>
										);
									})}
								</ul>
							</div>
						);
					}
				)}
			</>
		</section>
	);
};
