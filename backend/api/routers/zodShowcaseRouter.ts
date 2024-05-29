import { Router } from "express";

export const zodShowcaseRouter = Router();

zodShowcaseRouter.get("/employees", (_req, res) => {
	const employees = [
		{
			name: "Hans Altright",
			age: 411,
			email: "hans@company.com",
			employeeCode: "AB-8291"
		},
		{
			name: "Nilan Buchthaler",
			age: 7,
			email: "nilancompany.com",
			employeeCode: "AC-8199"
		},
		{
			name: "Robert Ahnshofer",
			age: 17,
			email: "robert@company.com",
			employeeCode: "AB-8273"
		},
		{
			name: "Angelika Schmidt",
			age: 29,
			email: "angelika@company.com",
			employeeCode: "AB-7282"
		},
	];
	res.json(employees);
});
