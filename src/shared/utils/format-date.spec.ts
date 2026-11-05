import { describe, expect, it } from "vitest";
import { formatLongDate, parseIsoDate } from "./format-date";

describe("formatLongDate", () => {
	it("formats a plain ISO date in Spanish", () => {
		expect(formatLongDate("2025-03-03")).toBe("3 de marzo de 2025");
	});

	it("accepts ISO date-times without shifting the day", () => {
		expect(formatLongDate("2025-03-03T23:59:00Z")).toBe("3 de marzo de 2025");
	});

	it("returns an empty string for invalid input", () => {
		expect(formatLongDate("03/03/2025")).toBe("");
	});
});

describe("parseIsoDate", () => {
	it("returns null when the value does not start with a date", () => {
		expect(parseIsoDate("")).toBeNull();
	});
});
