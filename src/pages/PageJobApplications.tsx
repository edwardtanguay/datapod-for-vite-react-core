/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { OverviewJobApplication } from "../../share/interfaces";
import { ProcessingJobApplication } from "../components/ProcessingJobApplication";
import { TodoJobApplication } from "../components/TodoJobApplication";
import { ClosedJobApplication } from "../components/ClosedJobApplication";

type ShowGroup = "todo" | "processing" | "closed";

export const PageJobApplications = () => {
	const {
		todoJobApplications,
		processingJobApplications,
		closedJobApplications,
	} = useContext(AppContext);
	const [currentJobApplications, setCurrentJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [currentShowGroup, setCurrentShowGroup] = useState<ShowGroup>("todo");
	const [pageIsReady, setPageIsReady] = useState(false);

	const handleShowTodoApplications = () => {
		setCurrentJobApplications(structuredClone(todoJobApplications));
		setCurrentShowGroup("todo");
	};

	const handleShowProcessingApplications = () => {
		setCurrentJobApplications(structuredClone(processingJobApplications));
		setCurrentShowGroup("processing");
	};

	const handleShowClosedApplications = () => {
		setCurrentJobApplications(structuredClone(closedJobApplications));
		setCurrentShowGroup("closed");
	};

	useEffect(() => {
		handleShowTodoApplications();
		if (todoJobApplications.length > 0) {
			setPageIsReady(true);
		}
	}, [todoJobApplications]);

	return (
		<>
			{pageIsReady && (
				<>
					<main>
						<section className="bg-gray-600 mb-3 py-1 px-2 rounded w-[60rem] text-gray-200">
							<div className="flex space-x-4">
								<label className="inline-flex cursor-pointer align-middle">
									<input
										type="radio"
										className="form-radio"
										name="status"
										value="todo"
										checked={currentShowGroup === "todo"}
										onChange={() =>
											handleShowTodoApplications()
										}
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
										checked={
											currentShowGroup === "processing"
										}
										onChange={() =>
											handleShowProcessingApplications()
										}
									/>
									<span className="ml-1 mb-1 select-none">
										{processingJobApplications.length}{" "}
										Processing
									</span>
								</label>
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="radio"
										className="form-radio"
										name="status"
										value="closed"
										checked={currentShowGroup === "closed"}
										onChange={() =>
											handleShowClosedApplications()
										}
									/>
									<span className="ml-1 mb-1 select-none">
										{closedJobApplications.length} Closed
									</span>
								</label>
							</div>
						</section>
						{currentJobApplications.map(
							(currentJobApplication, index) => {
								return (
									<>
										{currentJobApplication.kind ===
											"todo" && (
											<TodoJobApplication
												currentJobApplication={
													currentJobApplication
												}
												key={index}
											/>
										)}
										{currentJobApplication.kind ===
											"processing" && (
											<ProcessingJobApplication
												currentJobApplication={
													currentJobApplication
												}
												key={index}
											/>
										)}
										{currentJobApplication.kind ===
											"closed" && (
											<ClosedJobApplication
												currentJobApplication={
													currentJobApplication
												}
												key={index}
											/>
										)}
									</>
								);
							}
						)}
					</main>
				</>
			)}
		</>
	);
};
