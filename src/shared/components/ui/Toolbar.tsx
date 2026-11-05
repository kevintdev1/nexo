import type { ReactNode } from "react";

type ToolbarProps = {
	children: ReactNode;
};

export function Toolbar({ children }: ToolbarProps) {
	return (
		<div className="flex items-start gap-3 [&>*:first-child]:flex-1">
			{children}
		</div>
	);
}
