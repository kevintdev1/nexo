import { createEnumFilter } from "@shared/filters/enum.filter";
import { createTriStateFilter } from "@shared/filters/tri-state.filter";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useListView } from "./useListView";

type Person = { name: string; city: string; isDeleted: boolean };

const PEOPLE: Person[] = [
	{ name: "Ana Pérez", city: "tena", isDeleted: false },
	{ name: "Luis Andrade", city: "archidona", isDeleted: false },
	{ name: "José Ríos", city: "tena", isDeleted: true },
];

const FILTERS = [
	createEnumFilter<Person>({
		key: "city",
		label: "Ciudad",
		options: [],
		getValue: (person) => person.city,
	}),
	createTriStateFilter<Person>({
		key: "deleted",
		label: "Eliminados",
		labels: { exclude: "Ocultar", only: "Solo", all: "Todos" },
		getValue: (person) => person.isDeleted,
	}),
];

const getName = (person: Person) => person.name;

describe("useListView", () => {
	it("applies the initial filter values", () => {
		const { result } = renderHook(() => useListView(PEOPLE, FILTERS, getName));

		expect(result.current.results.map(getName)).toEqual([
			"Ana Pérez",
			"Luis Andrade",
		]);
		expect(result.current.filterMenu.activeCount).toBe(0);
	});

	it("combines filters with an accent-insensitive search", () => {
		const { result } = renderHook(() => useListView(PEOPLE, FILTERS, getName));

		act(() => result.current.filterMenu.onChange("deleted", "all"));
		act(() => result.current.filterMenu.onChange("city", ["tena"]));
		act(() => result.current.search.onValueChange("jose"));

		expect(result.current.results.map(getName)).toEqual(["José Ríos"]);
		expect(result.current.filterMenu.activeCount).toBe(2);
	});

	it("resets every filter to its initial value", () => {
		const { result } = renderHook(() => useListView(PEOPLE, FILTERS, getName));

		act(() => result.current.filterMenu.onChange("deleted", "only"));
		act(() => result.current.filterMenu.onReset());

		expect(result.current.results).toHaveLength(2);
		expect(result.current.filterMenu.activeCount).toBe(0);
	});
});
