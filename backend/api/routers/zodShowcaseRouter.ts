import { Router } from 'express';

export const zodShowcaseRouter = Router();

zodShowcaseRouter.get('/employees', (_req, res) => {
	const employees = [
		{
			name: "Hans Altright",
			age: "32",
			email: "hans@company.com"
		},
		{
			name: "Nilan Buchthaler",
			age: 29,
			email: "nilan@company.com"
		}
	];
	res.json(employees);
})