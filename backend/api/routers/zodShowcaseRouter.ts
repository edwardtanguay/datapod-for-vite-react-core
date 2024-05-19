import { Router } from "express";

export const zodShowcaseRouter = Router();

zodShowcaseRouter.get("/employees", (_req, res) => {
	const employees = [
		{
			name: "Hans Altright",
			age: 11,
			email: "hanscompany.com",
		},
		{
			name: "Nilan Buchthaler",
			age: "unknown",
			email: "nilan@company.com",
		},
		{
			name: "Robert Ahnshofer",
			age: 55,
			email: "robert@company.com",
		},
		{
			name: "Angelika Schmidt",
			age: 229,
			email: "angelika@company.com",
		},
	];
	res.json(employees);
});
