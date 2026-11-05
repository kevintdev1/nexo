import { describe, expect, it } from "vitest";
import { createEnumFilter } from "./enum.filter";

type Item = { color: string | null };

const filter = createEnumFilter<Item>({
	key: "color",
	label: "Color",
	options: [
		{ value: "red", label: "Rojo" },
		{ value: "blue", label: "Azul" },
	],
	getValue: (item) => item.color,
});

describe("createEnumFilter", () => {
	it("matches every item when nothing is selected", () => {
		expect(filter.matches({ color: "red" }, [])).toBe(true);
		expect(filter.isActive(filter.initialValue)).toBe(false);
	});

	it("matches only the selected values", () => {
		expect(filter.matches({ color: "red" }, ["red"])).toBe(true);
		expect(filter.matches({ color: "blue" }, ["red"])).toBe(false);
		expect(filter.isActive(["red"])).toBe(true);
	});

	it("never matches items without a value once a selection exists", () => {
		expect(filter.matches({ color: null }, ["red"])).toBe(false);
	});

	it("ignores values that are not a string list", () => {
		expect(filter.matches({ color: "blue" }, "red")).toBe(true);
	});
});
