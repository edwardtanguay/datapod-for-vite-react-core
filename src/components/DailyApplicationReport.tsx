import { useContext } from "react";
import { AppContext } from "../AppContext";

export const DailyApplicationReport = () => {
	const {
	fullReport
	} = useContext(AppContext);
	return (
		<section>
			<>
			<h2 className="mb-3 text-xl">{} Applications</h2>
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
									{day}
								</div>
								<ul className="list-disc ml-6 mb-2 pt-1">
									{applications.map((application, index) => {
										return (
											<li key={index}>
												<span className="font-semibold">{application.title}</span> - <span className="italic text-slate-700">{application.company}</span>
											</li>
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
