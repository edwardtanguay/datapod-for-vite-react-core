/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	FullReport,
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
	overviewJobApplications: OverviewJobApplication[];
	todoJobApplications: OverviewJobApplication[];
	processingJobApplications: OverviewJobApplication[];
	closedJobApplications: OverviewJobApplication[];
	currentlyCreatingApplication: boolean;
	fullReport: FullReport;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [appData, setAppData] = useState<IAppData>(blankAppData);
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
	const [fullReport, setFullReport] = useState<FullReport>({} as FullReport);

	useEffect(() => {
		(async () => {
			const _appData = await AppModel.getAppData();
			setAppData(_appData);
		})();
	}, []);

	const loadFullReport = async () => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/full-report`
			);
			const _fullReport: FullReport = response.data;
			setFullReport(_fullReport);
		})();
	};

	const loadOverviewJobApplications = () => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/overviewJobApplications`
			);
			const _overviewJobApplications: OverviewJobApplication[] =
				response.data;
			// _overviewJobApplications = structuredClone(_overviewJobApplications.sort((a, b) =>
			// 	a.letterDate < b.letterDate ? 1 : -1
			// ));
			setOverviewJobApplications(_overviewJobApplications);
			setTodoJobApplications(
				_overviewJobApplications
					.filter((m) => m.kind === "todo")
					.sort((a, b) => (a.job.rank < b.job.rank ? 1 : -1))
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
			loadFullReport();
		}, 100);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			loadOverviewJobApplications();
		}, 1400);
	}, []);

	const handleParseButton = async () => {
		try {
			await axios.get(`${appconfig.backendBaseUrl()}/parse-etsite-data`);
		} catch (e: any) {
			console.log("there was an error");
			console.log(e.message);
		}
	};

	return (
		<AppContext.Provider
			value={{
				appData,
				setAppData,
				handleParseButton,
				overviewJobApplications,
				todoJobApplications,
				processingJobApplications,
				closedJobApplications,
				currentlyCreatingApplication,
				fullReport,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
