import { describe, expect, it } from "vitest";
import { createTriStateFilter } from "./tri-state.filter";

type Item = { isDeleted: boolean };

const filter = createTriStateFilter<Item>({
	key: "deleted",
	label: "Eliminados",
	labels: { exclude: "Ocultar", only: "Solo", all: "Todos" },
	getValue: (item) => item.isDeleted,
});

const deleted = { isDeleted: true };
const active = { isDeleted: false };

describe("createTriStateFilter", () => {
	it("hides flagged items by default and is not active", () => {
		expect(filter.matches(deleted, filter.initialValue)).toBe(false);
		expect(filter.matches(active, filter.initialValue)).toBe(true);
		expect(filter.isActive(filter.initialValue)).toBe(false);
	});

	it("shows only flagged items in 'only' mode", () => {
		expect(filter.matches(deleted, "only")).toBe(true);
		expect(filter.matches(active, "only")).toBe(false);
		expect(filter.isActive("only")).toBe(true);
	});

	it("shows everything in 'all' mode", () => {
		expect(filter.matches(deleted, "all")).toBe(true);
		expect(filter.matches(active, "all")).toBe(true);
		expect(filter.isActive("all")).toBe(true);
	});

	it("falls back to the initial value for unknown input", () => {
		expect(filter.matches(deleted, "unknown")).toBe(false);
	});
});
