/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	FullJobApplication,
	GroupedApplicationDayReport,
	IAppData,
	OverviewJobApplication,
	blankAppData,
} from "../share/interfaces";
import * as AppModel from "./AppModel";
import axios from "axios";
import * as appconfig from "../backend/appconfig";

interface IAppContext {
	appData: IAppData;
	setAppData: (appData: IAppData) => void;
	handleParseButton: () => void;
	fullJobApplications: FullJobApplication[];
	overviewJobApplications: OverviewJobApplication[];
	todoJobApplications: OverviewJobApplication[];
	processingJobApplications: OverviewJobApplication[];
	closedJobApplications: OverviewJobApplication[];
	currentlyCreatingApplication: boolean;
	groupedApplicationDayReport: GroupedApplicationDayReport;
	handleFetchApplications: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [appData, setAppData] = useState<IAppData>(blankAppData);
	const [fullJobApplications, setFullJobApplications] = useState<
		FullJobApplication[]
	>([]);
	const [overviewJobApplications, setOverviewJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [todoJobApplications, setTodoJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [processingJobApplications, setProcessingJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [closedJobApplications, setClosedJobApplications] = useState<
		OverviewJobApplication[]
	>([]);
	const [currentlyCreatingApplication, setCurrentlyCreatingApplication] =
		useState(false);
	const [groupedApplicationDayReport, setGroupedApplicationDayReport] =
		useState<GroupedApplicationDayReport>({});

	useEffect(() => {
		(async () => {
			const _appData = await AppModel.getAppData();
			setAppData(_appData);
		})();
	}, []);

	// const getfullJobApplications = async () => {
	// 	(async () => {
	// 		const response = await axios.get(
	// 			`${appconfig.backendBaseUrl()}/job-applications/fullJobApplications`
	// 		);
	// 		const _fullJobApplications: FullJobApplication[] = response.data;
	// 		_fullJobApplications.sort((a, b) =>
	// 			a.letterDate + String(a.baseJobId) <
	// 			b.letterDate + String(b.baseJobId)
	// 				? 1
	// 				: -1
	// 		);
	// 		setFullJobApplications(_fullJobApplications);
	// 	})();
	// }

	// useEffect(() => {
	// }, []);

	const loadGroupedApplicationDayReport = async () => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/grouped-application-day-report`
			);
			const _groupedApplicationDayReport: GroupedApplicationDayReport =
				response.data;
			setGroupedApplicationDayReport(_groupedApplicationDayReport);
		})();
	};

	useEffect(() => {}, []);

	const loadOverviewJobApplications = () => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/overviewJobApplications`
			);
			const _overviewJobApplications: OverviewJobApplication[] =
				response.data;
			_overviewJobApplications.sort((a, b) =>
				a.fullJobApplication?.letterDate +
					String(a.fullJobApplication?.baseJobId) <
				b.fullJobApplication?.letterDate +
					String(b.fullJobApplication?.baseJobId)
					? 1
					: -1
			);
			setOverviewJobApplications(_overviewJobApplications);
			setTodoJobApplications(
				_overviewJobApplications
					.filter((m) => m.kind === "todo")
					.sort((a, b) => (a.job.id < b.job.id ? 1 : -1))
			);
			const _processingJobApplciations = _overviewJobApplications
				.filter((m) => m.kind === "processing")
				.sort((a, b) => (a.letterDate < b.letterDate ? 1 : -1));
			setProcessingJobApplications(_processingJobApplciations);
			setClosedJobApplications(
				_overviewJobApplications.filter((m) => m.kind === "closed")
			);

			for (const _processingJobApplciation of _processingJobApplciations) {
				if (_processingJobApplciation.lastStatus.includes("...")) {
					setCurrentlyCreatingApplication(true);
					break;
				}
			}
		})();
	};

	useEffect(() => {
		setTimeout(() => {
			loadGroupedApplicationDayReport();
		}, 100);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			loadOverviewJobApplications();
		}, 200);
	}, []);

	const handleParseButton = async () => {
		try {
			await axios.get(`${appconfig.backendBaseUrl()}/parse-etsite-data`);
		} catch (e: any) {
			console.log("there was an error");
			console.log(e.message);
		}
	};

	const handleFetchApplications = () => {
		// (async () => {
		// 	const response = await axios.get(
		// 		`${appconfig.backendBaseUrl()}/job-applications/overviewJobApplications`
		// 	);
		// 	const _jobApplications = response.data;
		// 	console.log('fetch', _jobApplications.length);
		// })();
		loadOverviewJobApplications();
	};

	// useEffect(() => {
	// 	handleFetchApplications();
	// },[])

	return (
		<AppContext.Provider
			value={{
				appData,
				setAppData,
				handleParseButton,
				fullJobApplications,
				overviewJobApplications,
				todoJobApplications,
				processingJobApplications,
				closedJobApplications,
				currentlyCreatingApplication,
				groupedApplicationDayReport,
				handleFetchApplications,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
