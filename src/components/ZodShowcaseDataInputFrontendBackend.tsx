import { useState } from "react";
import * as appConfig from '../../backend/appconfig';
import axios from "axios";
import { z } from 'zod';

const EmployeeSchema = z.object({
	name: z.string(),
	age: z.number(),
	email: z.string().email()
});

type Employee = z.infer<typeof EmployeeSchema>;

type RejectedEmployee = {
	message: string,
	badObject: unknown
}

export const ZodShowcaseDataInputFrontendBackend = () => {
	const [employeesAreLoaded, setEmployeesAreLoaded] = useState(false);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [rejectedEmployees, setRejectedEmployees] = useState<RejectedEmployee[]>([]);

	const loadEmployees = async () => {
		const response = await axios.get(`${appConfig.backendBaseUrl()}/zod-showcase/employees`);
		const rawEmployees: unknown[] = response.data;
		const _employees: Employee[] = [];
		const _rejectedEmployees: RejectedEmployee[] = [];
		for (const rawEmployee of rawEmployees) {
			const rawEmployeeValidityCheck = EmployeeSchema.safeParse(rawEmployee);
			if (rawEmployeeValidityCheck.success) {
				_employees.push(rawEmployee as Employee);
			} else {
				_rejectedEmployees.push({
					message: 'bad employee',
					badObject: rawEmployee
				});
			}
		}
		setEmployees(_employees);
		setRejectedEmployees(_rejectedEmployees);
		setEmployeesAreLoaded(true);
	};

	return (
		<>
			<section>
				<button className="generic" onClick={loadEmployees}>Load employees</button>
			</section>
			{employeesAreLoaded && (
				<section>
					<p>{employees.length} employees were loaded:</p>
					<ul className="list-disc ml-6 text-sm">
						{employees.map((employee, index) => {
							return (
								<li key={index}>{employee.name}, age {employee.age}, {employee.email}</li>
							)
						})}
					</ul>
					<p>{rejectedEmployees.length} employees were rejected:</p>
					<ul className="list-disc ml-6 text-sm">
						{rejectedEmployees.map((rejectedEmployee, index) => {
							return (
								<div key={index}><h3>{rejectedEmployee.message}</h3><pre>{JSON.stringify(rejectedEmployee, null, 2)}</pre></div>
							)
						})}
					</ul>
				</section>
			)}
		</>
	)
}