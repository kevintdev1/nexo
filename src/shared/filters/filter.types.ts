import type { ReactNode } from "react";

export type FilterValues = Readonly<Record<string, unknown>>;

export type Filter<TItem> = {
	key: string;
	label: string;
	initialValue: unknown;
	matches: (item: TItem, value: unknown) => boolean;
	isActive: (value: unknown) => boolean;
	renderControl: (
		value: unknown,
		onChange: (value: unknown) => void,
	) => ReactNode;
};
