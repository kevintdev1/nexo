import { RadioGroup } from "@ui/forms/RadioGroup";
import type { Filter } from "./filter.types";

const TRI_STATES = ["exclude", "only", "all"] as const;

export type TriState = (typeof TRI_STATES)[number];

type TriStateFilterConfig<TItem> = {
	key: string;
	label: string;
	labels: Readonly<Record<TriState, string>>;
	getValue: (item: TItem) => boolean;
	initialValue?: TriState;
};

function isTriState(value: unknown): value is TriState {
	return TRI_STATES.some((state) => state === value);
}

const MATCHERS: Record<TriState, (isFlagged: boolean) => boolean> = {
	exclude: (isFlagged) => !isFlagged,
	only: (isFlagged) => isFlagged,
	all: () => true,
};

export function createTriStateFilter<TItem>({
	key,
	label,
	labels,
	getValue,
	initialValue = "exclude",
}: TriStateFilterConfig<TItem>): Filter<TItem> {
	const toState = (value: unknown) =>
		isTriState(value) ? value : initialValue;
	const options = TRI_STATES.map((state) => ({
		value: state,
		label: labels[state],
	}));

	return {
		key,
		label,
		initialValue,
		matches: (item, value) => MATCHERS[toState(value)](getValue(item)),
		isActive: (value) => toState(value) !== initialValue,
		renderControl: (value, onChange) => (
			<RadioGroup
				legend={label}
				options={options}
				value={toState(value)}
				onChange={onChange}
			/>
		),
	};
}
