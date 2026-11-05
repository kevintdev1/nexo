import type { Identifiable } from "@shared/types/identifiable";

export function appendItem<TItem>(
	items: readonly TItem[],
	item: TItem,
): TItem[] {
	return [...items, item];
}

export function patchItem<TItem extends Identifiable>(
	items: readonly TItem[],
	id: string,
	patch: Partial<TItem>,
): TItem[] {
	return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

export function removeItem<TItem extends Identifiable>(
	items: readonly TItem[],
	id: string,
): TItem[] {
	return items.filter((item) => item.id !== id);
}
