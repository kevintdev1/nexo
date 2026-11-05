import type { Filter } from "@shared/filters/filter.types";
import { useFilters } from "./useFilters";
import { useSearch } from "./useSearch";

export function useListView<TItem>(
	items: readonly TItem[],
	filters: readonly Filter<TItem>[],
	getSearchableText: (item: TItem) => string,
) {
	const filtering = useFilters(items, filters);
	const { search, setSearch, results } = useSearch(
		filtering.results,
		getSearchableText,
	);

	return {
		results,
		search: { value: search, onValueChange: setSearch },
		filterMenu: {
			filters,
			values: filtering.values,
			activeCount: filtering.activeCount,
			onChange: filtering.setValue,
			onReset: filtering.reset,
		},
	};
}
