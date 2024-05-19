/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as appconfig from "../backend/appconfig";
import { IAppData } from "../share/interfaces";

export const getAppData = async () => {
	return new Promise<IAppData>((resolve) => {
		(async () => {
			const response = await axios.get(`${appconfig.backendBaseUrl()}/appData`);
			const _appData: IAppData = response.data;
			resolve(_appData);
		})();
	});
};
