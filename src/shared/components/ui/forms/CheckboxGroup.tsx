import type { Option } from "@shared/types/option";

type CheckboxGroupProps = {
	legend: string;
	options: readonly Option[];
	value: readonly string[];
	onChange: (value: string[]) => void;
};

export function CheckboxGroup({
	legend,
	options,
	value,
	onChange,
}: CheckboxGroupProps) {
	const toggle = (optionValue: string) =>
		onChange(
			value.includes(optionValue)
				? value.filter((selected) => selected !== optionValue)
				: [...value, optionValue],
		);

	return (
		<fieldset className="flex flex-col gap-1">
			<legend className="sr-only">{legend}</legend>
			{options.map((option) => (
				<label
					key={option.value}
					className="flex cursor-pointer items-center gap-2"
				>
					<input
						type="checkbox"
						checked={value.includes(option.value)}
						onChange={() => toggle(option.value)}
						className="size-4 cursor-pointer accent-primary"
					/>
					{option.label}
				</label>
			))}
		</fieldset>
	);
}
