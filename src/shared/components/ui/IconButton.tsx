import type { ReactNode } from "react";
import { Button, type ButtonProps } from "./Button";

type IconButtonProps = Omit<ButtonProps, "children" | "size" | "isLoading"> & {
	icon: ReactNode;
	label: string;
};

export function IconButton({
	icon,
	label,
	variant = "ghost",
	...props
}: IconButtonProps) {
	return (
		<Button
			variant={variant}
			size="icon"
			aria-label={label}
			title={label}
			{...props}
		>
			{icon}
		</Button>
	);
}
