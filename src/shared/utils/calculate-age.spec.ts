import { describe, expect, it } from "vitest";
import { calculateAge } from "./calculate-age";

describe("calculateAge", () => {
	const today = new Date(2026, 10, 4);

	it("counts the birthday when it already happened this year", () => {
		expect(calculateAge("2005-03-15", today)).toBe(21);
	});

	it("subtracts a year when the birthday has not happened yet", () => {
		expect(calculateAge("2005-12-20", today)).toBe(20);
	});

	it("counts the birthday on the same day", () => {
		expect(calculateAge("2005-11-04", today)).toBe(21);
	});

	it("returns null for an invalid date", () => {
		expect(calculateAge("not-a-date", today)).toBeNull();
	});
});
