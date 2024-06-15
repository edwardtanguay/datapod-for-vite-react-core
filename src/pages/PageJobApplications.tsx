/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { OverviewJobApplication, ShowGroup } from "../../share/interfaces";
import { ProcessingJobApplication } from "../components/ProcessingJobApplication";
import { TodoJobApplication } from "../components/TodoJobApplication";
import { ClosedJobApplication } from "../components/ClosedJobApplication";
import { DailyApplicationReport } from "../components/DailyApplicationReport";
import { MainJobApplicationHeader } from "../components/MainJobApplicationHeader";

export const PageJobApplications = () => {
	const {
		todoJobApplications,
		processingJobApplications,
		closedJobApplications,
		currentlyCreatingApplication,
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
		if (currentlyCreatingApplication) {
			handleShowProcessingApplications();
		} else {
			handleShowTodoApplications();
		}
		if (todoJobApplications.length > 0) {
			setPageIsReady(true);
		}
	}, [todoJobApplications]);

	return (
		<>
			{pageIsReady && (
				<section className="flex gap-6">
					<main>
					<MainJobApplicationHeader currentShowGroup={currentShowGroup} handleShowTodoApplications={handleShowTodoApplications} handleShowProcessingApplications={handleShowProcessingApplications} handleShowClosedApplications={handleShowClosedApplications}/>	
						{currentJobApplications.map(
							(currentJobApplication, index) => {
								return (
									<div key={index}>
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
									</div>
								);
							}
						)}
					</main>
					<DailyApplicationReport />
				</section>
			)}
		</>
	);
};
