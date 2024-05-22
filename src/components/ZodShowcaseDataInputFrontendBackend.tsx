import { useState } from "react";
import * as appConfig from '../../backend/appconfig';
import axios from "axios";
import { ZodError, z } from 'zod';
import * as qstr from '../../share/qtools/qstr';

const EmployeeSchema = z.object({
	name: z.string(),
	age: z.number().max(120).min(16),
	email: z.string().email(),
	employeeCode: z.string()
		.refine(value => /^[A-Z]{2}-\d{4}$/.test(value), {
			message: "Format must be two letters plus hyphen plus four numbers, e.g. HW-0082"
		})
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
		let finalErrorMessage = '';

		const _errorMessages: string[] = [];
		for (const issue of error.issues) {
			_errorMessages.push(`property "${issue.path[0]}" ${issue.message.toLowerCase()}`);
		}

		const errorMessages: string[] = [];
		if (_errorMessages.length > 1) {
			let count = 1;
			for (const _errorMessage of _errorMessages) {
				errorMessages.push(`(${count}) ${_errorMessage}`);
				count++;
			}
			finalErrorMessage = 'REJECTION REASONS: ' + errorMessages.join(', ');
		} else {
			finalErrorMessage = 'REJECTION REASON: ' + _errorMessages[0];
		}
		return finalErrorMessage;
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
				<p className="intro">Even if you or your team controls the backend, you shouldn't trust data that it sends since someone may have made a mistake, or the backend may not be the latest version you expect, or any number of other reasons.</p>
				<p className="instructions">Change the data in <a href="https://github.com/edwardtanguay/datapod-for-vite-react-core/blob/dev/backend/api/routers/zodShowcaseRouter.ts" target="_blank" className="underline">this employee array</a> in the backend and press the button to see how any employee object with an invalid property will be rejected.</p>
				<button className="generic" onClick={loadEmployees}>Load employees</button>
			</section>
			{employeesAreLoaded && (
				<section>
					<p className="font-semibold">{qstr.smartPlural(employees.length, 'employee was', 'employees were')} loaded:</p>
					<ul className="list-disc ml-6 text-green-950">
						{employees.map((employee, index) => {
							return (
								<li key={index}>{employee.name}, age {employee.age}, {employee.email}, (EMPLOYEE CODE: {employee.employeeCode})</li>
							)
						})}
					</ul>
					<p className="font-semibold">{qstr.smartPlural(rejectedEmployees.length, 'employee was', 'employees were')} rejected:</p>
					<div className="flex gap-3 flex-col">
						{rejectedEmployees.map((rejectedEmployee, index) => {
							return (
								<div key={index} className="bg-red-900 p-3 rounded mt-2"><h3 className="mb-3 text-yellow-300">{rejectedEmployee.message}</h3><pre className="text-xs bg-gray-800 text-gray-200 font-mono p-2">{JSON.stringify(rejectedEmployee.badObject, null, 2)}</pre></div>
							)
						})}
					</div>
				</section>
			)}
		</>
	)
}