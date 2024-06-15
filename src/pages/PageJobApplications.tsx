/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { OverviewJobApplication, ShowGroup } from "../../share/interfaces";
import { DailyApplicationReport } from "../components/DailyApplicationReport";
import { MainJobApplicationHeader } from "../components/MainJobApplicationHeader";
import { MainJobApplicationSection } from "../components/MainJobApplicationSection";

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
						<MainJobApplicationHeader
							currentShowGroup={currentShowGroup}
							handleShowTodoApplications={
								handleShowTodoApplications
							}
							handleShowProcessingApplications={
								handleShowProcessingApplications
							}
							handleShowClosedApplications={
								handleShowClosedApplications
							}
						/>
						<MainJobApplicationSection
							currentJobApplications={currentJobApplications}
						/>
					</main>
					<DailyApplicationReport />
				</section>
			)}
		</>
	);
};
