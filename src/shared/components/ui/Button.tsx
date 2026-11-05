import { cn } from "@shared/utils/cn";
import type { ComponentProps } from "react";
import { Spinner } from "./Spinner";

const BASE =
	"inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS = {
	primary:
		"bg-primary text-primary-foreground shadow-md hover:shadow-xl hover:brightness-110",
	success:
		"bg-success text-success-foreground shadow-md hover:shadow-xl hover:brightness-110",
	accent:
		"bg-accent text-accent-foreground shadow-md hover:shadow-xl hover:brightness-110",
	danger:
		"bg-danger text-danger-foreground shadow-md hover:shadow-xl hover:brightness-110",
	ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
} as const;

const SIZES = {
	md: "px-5 py-2.5",
	icon: "size-10 rounded-full",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

type ButtonClassesOptions = {
	variant?: ButtonVariant;
	size?: keyof typeof SIZES;
	className?: string;
};

export function buttonClasses({
	variant = "primary",
	size = "md",
	className,
}: ButtonClassesOptions = {}) {
	return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export type ButtonProps = ComponentProps<"button"> &
	Omit<ButtonClassesOptions, "className"> & {
		isLoading?: boolean;
	};

export function Button({
	variant,
	size,
	isLoading = false,
	disabled,
	type = "button",
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			aria-busy={isLoading}
			className={buttonClasses({ variant, size, className })}
			{...props}
		>
			{isLoading ? <Spinner size="sm" /> : children}
		</button>
	);
}
