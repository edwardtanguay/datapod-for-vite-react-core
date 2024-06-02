import { useContext } from "react";
import { AppContext } from "../AppContext";

export const DailyApplicationReport = () => {
	const {
		groupedApplicationDayReport,
	} = useContext(AppContext);
	return (
		<section>
			<>
				{Object.entries(groupedApplicationDayReport).map(
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
												{application.company}
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
