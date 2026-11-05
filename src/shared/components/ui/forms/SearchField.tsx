import { cn } from "@shared/utils/cn";
import { LuX } from "react-icons/lu";
import { FIELD_CONTROL_CLASSES } from "./field.styles";

type SearchFieldProps = {
	id: string;
	label: string;
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
};

export function SearchField({
	id,
	label,
	value,
	onValueChange,
	placeholder,
}: SearchFieldProps) {
	return (
		<div className="relative">
			<label htmlFor={id} className="sr-only">
				{label}
			</label>
			<input
				id={id}
				type="search"
				value={value}
				placeholder={placeholder}
				onChange={(event) => onValueChange(event.target.value)}
				className={cn(
					FIELD_CONTROL_CLASSES,
					"pr-10 [&::-webkit-search-cancel-button]:hidden",
				)}
			/>
			{value && (
				<button
					type="button"
					aria-label="Limpiar búsqueda"
					onClick={() => onValueChange("")}
					className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground"
				>
					<LuX className="size-5" />
				</button>
			)}
		</div>
	);
}
