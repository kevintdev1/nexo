import { cn } from "@shared/utils/cn";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

const SIZES = {
	sm: 25,
	md: 40,
	lg: 64,
} as const;

type SpinnerProps = {
	size?: keyof typeof SIZES;
	label?: string;
	className?: string;
};

export function Spinner({
	size = "md",
	label = "Cargando",
	className,
}: SpinnerProps) {
	return (
		<span
			role="status"
			aria-label={label}
			className={cn("inline-flex", className)}
		>
			<Bouncy size={SIZES[size]} speed={1.75} color="currentColor" />
		</span>
	);
}
