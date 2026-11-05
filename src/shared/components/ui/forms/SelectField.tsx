import type { Option } from "@shared/types/option";
import { cn } from "@shared/utils/cn";
import type { ComponentProps } from "react";
import { FieldError } from "./FieldError";
import { FIELD_CONTROL_CLASSES, FIELD_INVALID_CLASSES } from "./field.styles";

type SelectFieldProps = Omit<ComponentProps<"select">, "children"> & {
	id: string;
	label: string;
	options: readonly Option[];
	placeholder?: string;
	error?: string;
};

export function SelectField({
	id,
	label,
	options,
	placeholder = "Seleccione una opción",
	error,
	className,
	...props
}: SelectFieldProps) {
	const errorId = `${id}-error`;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="font-medium">
				{label}
			</label>
			<select
				id={id}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? errorId : undefined}
				className={cn(
					FIELD_CONTROL_CLASSES,
					"cursor-pointer",
					error && FIELD_INVALID_CLASSES,
					className,
				)}
				{...props}
			>
				<option value="" disabled>
					{placeholder}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<FieldError id={errorId} message={error} />
		</div>
	);
}
