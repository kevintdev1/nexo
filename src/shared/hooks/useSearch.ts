import { normalizeText } from "@shared/utils/normalize-text";
import { useMemo, useState } from "react";

export function useSearch<TItem>(
	items: readonly TItem[],
	getSearchableText: (item: TItem) => string,
) {
	const [search, setSearch] = useState("");

	const results = useMemo(() => {
		const query = normalizeText(search);
		if (!query) return items;
		return items.filter((item) =>
			normalizeText(getSearchableText(item)).includes(query),
		);
	}, [items, search, getSearchableText]);

	return { search, setSearch, results };
}
