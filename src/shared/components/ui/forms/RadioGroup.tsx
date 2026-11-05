import type { Option } from "@shared/types/option";
import { useId } from "react";

type RadioGroupProps = {
	legend: string;
	options: readonly Option[];
	value: string;
	onChange: (value: string) => void;
};

export function RadioGroup({
	legend,
	options,
	value,
	onChange,
}: RadioGroupProps) {
	const name = useId();

	return (
		<fieldset className="flex flex-col gap-1">
			<legend className="sr-only">{legend}</legend>
			{options.map((option) => (
				<label
					key={option.value}
					className="flex cursor-pointer items-center gap-2"
				>
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={value === option.value}
						onChange={() => onChange(option.value)}
						className="size-4 cursor-pointer accent-primary"
					/>
					{option.label}
				</label>
			))}
		</fieldset>
	);
}
