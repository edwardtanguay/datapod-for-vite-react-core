import { useContext, useState } from "react";
import { ShowGroup } from "../../share/interfaces";
import { AppContext } from "../AppContext";

interface IProps {
	currentShowGroup: ShowGroup;
	handleShowTodoApplications: () => void;
	handleShowProcessingApplications: () => void;
	handleShowClosedApplications: () => void;
}

export const MainJobApplicationHeader = ({
	currentShowGroup,
	handleShowTodoApplications,
	handleShowProcessingApplications,
	handleShowClosedApplications,
}: IProps) => {
	const {
		todoJobApplications,
		processingJobApplications,
		closedJobApplications,
	} = useContext(AppContext);
	const [overviewListShowing, setOverviewListShowing] = useState(false);

	const handleToggleOverviewList = () => {
		setOverviewListShowing(!overviewListShowing);
	}

	return (
		<section className="mb-3">
			<section className="bg-gray-600 py-1 px-2 rounded w-[60rem] text-gray-200 flex justify-between">
				<div className="flex space-x-4">
					<label className="inline-flex cursor-pointer align-middle">
						<input
							type="radio"
							className="form-radio"
							name="status"
							value="todo"
							checked={currentShowGroup === "todo"}
							onChange={() => handleShowTodoApplications()}
						/>
						<span className="ml-1 mb-1 select-none">
							{todoJobApplications.length} Todo
						</span>
					</label>
					<label className="inline-flex items-center cursor-pointer">
						<input
							type="radio"
							className="form-radio"
							name="status"
							value="processing"
							checked={currentShowGroup === "processing"}
							onChange={() => handleShowProcessingApplications()}
						/>
						<span className="ml-1 mb-1 select-none">
							{processingJobApplications.length} Active
						</span>
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
						<span className="ml-1 mb-1 select-none">
							{closedJobApplications.length} Closed
						</span>
					</label>
				</div>
				<div className="buttonList">
					<button className="generic2 mr-1 text-slate-900" onClick={() => handleToggleOverviewList()}>
						Overview List
					</button>
				</div>
			</section>
			<section className="copyPasteTexts">
				{overviewListShowing && (
				<textarea className="w-full">nnn</textarea>
				)}
			</section>
		</section>
	);
};
