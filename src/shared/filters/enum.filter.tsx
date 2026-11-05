import type { Option } from "@shared/types/option";
import { CheckboxGroup } from "@ui/forms/CheckboxGroup";
import type { Filter } from "./filter.types";

type EnumFilterConfig<TItem> = {
	key: string;
	label: string;
	options: readonly Option[];
	getValue: (item: TItem) => string | null;
};

function toSelection(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter((entry): entry is string => typeof entry === "string");
}

export function createEnumFilter<TItem>({
	key,
	label,
	options,
	getValue,
}: EnumFilterConfig<TItem>): Filter<TItem> {
	return {
		key,
		label,
		initialValue: [],
		matches: (item, value) => {
			const selection = toSelection(value);
			if (selection.length === 0) return true;
			const itemValue = getValue(item);
			return itemValue !== null && selection.includes(itemValue);
		},
		isActive: (value) => toSelection(value).length > 0,
		renderControl: (value, onChange) => (
			<CheckboxGroup
				legend={label}
				options={options}
				value={toSelection(value)}
				onChange={onChange}
			/>
		),
	};
}
