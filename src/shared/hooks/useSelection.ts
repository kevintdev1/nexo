import { useCallback, useState } from "react";

export function useSelection<TItem>() {
	const [selected, setSelected] = useState<TItem | null>(null);

	const select = useCallback((item: TItem) => setSelected(item), []);
	const clear = useCallback(() => setSelected(null), []);

	return { selected, select, clear };
}
