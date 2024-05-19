import { useEffect, useState } from "react";
import * as appConfig from '../../backend/appconfig';
import axios from "axios";

type Employee = {
	name: string;
	age: number;
	email: string;
}

export const ZodShowcaseDataInputFrontendBackend = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${appConfig.backendBaseUrl()}/zod-showcase/employees`);
			const _employees = response.data;
			setEmployees(_employees);
		})();
	}, []);

	return (
		<>
			<p>There are {employees.length} employees:</p>
			<ul className="list-disc ml-4 text-sm">
				{employees.map((employee, index) => {
					return (
						<li key={index}>{employee.name}, age {employee.age}, {employee.email}</li>
					)
				})}
			</ul>
		</>
	)
}