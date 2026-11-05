import { cn } from "@shared/utils/cn";
import type { ComponentProps } from "react";
import { FieldError } from "./FieldError";
import { FIELD_CONTROL_CLASSES, FIELD_INVALID_CLASSES } from "./field.styles";

type InputFieldProps = ComponentProps<"input"> & {
	id: string;
	label: string;
	error?: string;
};

export function InputField({
	id,
	label,
	error,
	className,
	...props
}: InputFieldProps) {
	const errorId = `${id}-error`;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="font-medium">
				{label}
			</label>
			<input
				id={id}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? errorId : undefined}
				className={cn(
					FIELD_CONTROL_CLASSES,
					error && FIELD_INVALID_CLASSES,
					className,
				)}
				{...props}
			/>
			<FieldError id={errorId} message={error} />
		</div>
	);
}
