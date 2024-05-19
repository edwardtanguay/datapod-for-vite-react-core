import { useEffect, useState } from "react";
import * as appConfig from '../../backend/appconfig';
import axios from "axios";

export const ZodShowcaseDataInputFrontendBackend = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${appConfig.backendBaseUrl()}/zod-showcase/employees`);
			const _employees = response.data;
			console.log('emps', _employees);
			setEmployees(_employees);
		})();
	}, []);

	return (
		<>
			<p>There are {employees.length} employees.</p>
		</>
	)
}