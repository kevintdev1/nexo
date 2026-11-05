import type { Filter, FilterValues } from "@shared/filters/filter.types";
import { useCallback, useMemo, useState } from "react";

export function useFilters<TItem>(
	items: readonly TItem[],
	filters: readonly Filter<TItem>[],
) {
	const [overrides, setOverrides] = useState<FilterValues>({});

	const values = useMemo<FilterValues>(
		() =>
			Object.fromEntries(
				filters.map((filter) => [
					filter.key,
					Object.hasOwn(overrides, filter.key)
						? overrides[filter.key]
						: filter.initialValue,
				]),
			),
		[filters, overrides],
	);

	const results = useMemo(
		() =>
			items.filter((item) =>
				filters.every((filter) => filter.matches(item, values[filter.key])),
			),
		[items, filters, values],
	);

	const activeCount = filters.filter((filter) =>
		filter.isActive(values[filter.key]),
	).length;

	const setValue = useCallback((key: string, value: unknown) => {
		setOverrides((current) => ({ ...current, [key]: value }));
	}, []);

	const reset = useCallback(() => setOverrides({}), []);

	return { values, setValue, reset, results, activeCount };
}
