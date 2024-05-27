import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageJobApplications = () => {
	const { fullJobApplications } = useContext(AppContext);

	return (
		<>
			<p className="mb-3">There are {fullJobApplications.length} applications:</p>
			{fullJobApplications.map((fullJobApplication) => {
				return (
					<header className="bg-slate-500 p-4 rounded w-1/2">
						<p className="text-xl">{fullJobApplication.jobTitle}</p>
						<p className="italic mb-2">{fullJobApplication.company}</p>
						<textarea className="rounded w-full h-[30rem] bg-gray-300">

						</textarea>
					</header>
				);
			})}
		</>
	);
};
