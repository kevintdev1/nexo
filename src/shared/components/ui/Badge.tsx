import { cn } from "@shared/utils/cn";
import type { ReactNode } from "react";

const TONES = {
	success: "bg-success-soft text-success-soft-foreground",
	warning: "bg-warning-soft text-warning-soft-foreground",
	danger: "bg-danger-soft text-danger-soft-foreground",
	neutral: "bg-muted text-muted-foreground",
} as const;

export type BadgeTone = keyof typeof TONES;

type BadgeProps = {
	tone?: BadgeTone;
	children: ReactNode;
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-xl px-2 py-1 font-medium text-xs",
				TONES[tone],
			)}
		>
			{children}
		</span>
	);
}
