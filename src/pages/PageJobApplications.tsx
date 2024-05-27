import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageJobApplications = () => {
	const { fullJobApplications } = useContext(AppContext);

	return (
		<>
			<h2 className="text-2xl mb-3">There are {fullJobApplications.length} applications:</h2>
			{fullJobApplications.map((fullJobApplication) => {
				return (
					<>
						<p>{fullJobApplication.baseJobId}</p>
						<p>{fullJobApplication.language}</p>
						<p>{fullJobApplication.jobTitle}</p>
						<p>{fullJobApplication.company}</p>
					</>
				);
			})}
		</>
	);
};
