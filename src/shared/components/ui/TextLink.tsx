import { cn } from "@shared/utils/cn";
import type { ComponentProps } from "react";
import { Link } from "react-router";

export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
	return (
		<Link
			className={cn("inline-block font-medium hover:underline", className)}
			{...props}
		/>
	);
}
