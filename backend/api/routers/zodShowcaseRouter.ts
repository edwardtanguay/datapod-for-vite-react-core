import { Router } from "express";

export const zodShowcaseRouter = Router();

zodShowcaseRouter.get("/employees", (_req, res) => {
	const employees = [
		{
			name: "Hans Altright",
			age: 41,
			email: "hans@company.com",
		},
		{
			name: "Nilan Buchthaler",
			age: 77,
			email: "nilan@company.com",
		},
		{
			name: "Robert Ahnshofer",
			age: 55,
			email: "robert@company.com",
		},
		{
			name: "Angelika Schmidt",
			age: 29,
			email: "angelika@company.com",
		},
	];
	res.json(employees);
});
