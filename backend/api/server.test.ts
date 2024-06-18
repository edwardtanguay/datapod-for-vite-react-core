import { expect, describe, it } from "vitest";
import request from "supertest";
import { app } from "./server";

describe("GET /", async () => {
	const response = await request(app).get("/");
	it("receives correct HTTP code", () => {
		expect(response.statusCode).toBe(200);
	});
});

describe("GET /appdata", async () => {
	const response = await request(app).get("/appdata");
	it("receives correct HTTP code", () => {
		expect(response.statusCode).toBe(200);
	});
	it("JSON object contains correct properties", () => {
		const responseBody = JSON.parse(response.text);
		expect(responseBody).toHaveProperty("appIdCode");
	});
});
