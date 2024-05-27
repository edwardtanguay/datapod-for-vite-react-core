/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	FullJobApplication,
	IAppData,
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

	useEffect(() => {
		(async () => {
			const _appData = await AppModel.getAppData();
			setAppData(_appData);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${appconfig.backendBaseUrl()}/job-applications/full`
			);
			const _fullJobApplications = response.data;
			console.log(_fullJobApplications);
			setFullJobApplications(_fullJobApplications);
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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
