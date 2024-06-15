import { OverviewJobApplication } from "../../share/interfaces";
import { ClosedJobApplication } from "./ClosedJobApplication";
import { ProcessingJobApplication } from "./ProcessingJobApplication";
import { TodoJobApplication } from "./TodoJobApplication";

interface IProps {
	currentJobApplications: OverviewJobApplication[]
}

export const MainJobApplicationSection = ({ currentJobApplications } : IProps) => {
	return (
		<>
			{currentJobApplications.map((currentJobApplication, index) => {
				return (
					<div key={index}>
						{currentJobApplication.kind === "todo" && (
							<TodoJobApplication
								currentJobApplication={currentJobApplication}
								key={index}
							/>
						)}
						{currentJobApplication.kind === "processing" && (
							<ProcessingJobApplication
								currentJobApplication={currentJobApplication}
								key={index}
							/>
						)}
						{currentJobApplication.kind === "closed" && (
							<ClosedJobApplication
								currentJobApplication={currentJobApplication}
								key={index}
							/>
						)}
					</div>
				);
			})}
		</>
	);
};
