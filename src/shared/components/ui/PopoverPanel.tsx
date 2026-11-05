import { cn } from "@shared/utils/cn";
import type { ComponentProps } from "react";
import { createPortal } from "react-dom";

export function PopoverPanel({
	className,
	style,
	...props
}: ComponentProps<"div">) {
	return createPortal(
		<div className={cn("fixed z-50", className)} style={style} {...props} />,
		document.body,
	);
}
