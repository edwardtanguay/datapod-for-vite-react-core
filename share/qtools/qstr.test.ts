import { expect, describe, it } from "vitest";
import * as qstr from './qstr';

describe("qstr.isEmpty()", async () => {
	it("has basic functionality", () => {
		expect(qstr.isEmpty('')).toBe(true);
		expect(qstr.isEmpty('nnn')).toBe(false);
	});
	it("edge cases pass", () => {
		expect(qstr.isEmpty('  ')).toBe(true);
	});
});
