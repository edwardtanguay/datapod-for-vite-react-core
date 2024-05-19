import { useState } from "react";
import * as appConfig from '../../backend/appconfig';
import axios from "axios";
import { ZodError, z } from 'zod';
import * as qstr from '../../share/qtools/qstr';

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

	const getErrorMessage = (error: ZodError) => {
		const errorMessages: string[] = [];
		let count = 1;
		for (const issue of error.issues) {
			errorMessages.push(`${count}. ${issue.message}`);
			count++;
		}
		return ': ' + errorMessages.join(', ');
	}

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
					message: getErrorMessage(rawEmployeeValidityCheck.error),
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
					<p className="font-semibold">{qstr.smartPlural(employees.length, 'employee was', 'employees were')} loaded:</p>
					<ul className="list-disc ml-6 text-green-950">
						{employees.map((employee, index) => {
							return (
								<li key={index}>{employee.name}, age {employee.age}, {employee.email}</li>
							)
						})}
					</ul>
					<p className="font-semibold">{qstr.smartPlural(rejectedEmployees.length, 'employee was', 'employees were')} rejected:</p>
					<div className="flex gap-3 flex-col">
						{rejectedEmployees.map((rejectedEmployee, index) => {
							return (
								<div key={index} className="bg-red-900 p-3 rounded mt-2"><h3 className="mb-3 text-yellow-300">{rejectedEmployee.message}</h3><pre className="text-xs bg-gray-800 text-gray-400 font-mono p-2">{JSON.stringify(rejectedEmployee.badObject, null, 2)}</pre></div>
							)
						})}
					</div>
				</section>
			)}
		</>
	)
}