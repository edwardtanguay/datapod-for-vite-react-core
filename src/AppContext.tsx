/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	FullJobApplication,
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

	useEffect(() => {
		(async () => {
			const _appData = await AppModel.getAppData();
			setAppData(_appData);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/fullJobApplications`
			);
			const _fullJobApplications:FullJobApplication[] = response.data;
			_fullJobApplications.sort((a, b) => a.letterDate + String(a.baseJobId) < b.letterDate + String(b.baseJobId) ? 1 : -1);
			setFullJobApplications(_fullJobApplications);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/overviewJobApplications`
			);
			const _overviewJobApplications:OverviewJobApplication[] = response.data;
			_overviewJobApplications.sort((a, b) => a.fullJobApplication?.letterDate + String(a.fullJobApplication?.baseJobId) < b.fullJobApplication?.letterDate + String(b.fullJobApplication?.baseJobId) ? 1 : -1);
			setOverviewJobApplications(_overviewJobApplications);
			setTodoJobApplications(_overviewJobApplications.filter(m => m.fullJobApplication === undefined));
			setProcessingJobApplications(_overviewJobApplications.filter(m => m.fullJobApplication !== undefined && m.status !== 'closed'));
			setClosedJobApplications(_overviewJobApplications.filter(m => m.fullJobApplication !== undefined && m.status === 'closed'));
		})();
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
				fullJobApplications,
				overviewJobApplications,
				todoJobApplications,
				processingJobApplications,
				closedJobApplications
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
