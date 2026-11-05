import type { ReactNode } from "react";

type ContentCardProps = {
	header?: ReactNode;
	children: ReactNode;
};

export function ContentCard({ header, children }: ContentCardProps) {
	return (
		<section className="min-h-full rounded-2xl border border-border bg-surface">
			{header && <header className="px-6 py-5">{header}</header>}
			<div className="border-border border-t px-6 py-5">{children}</div>
		</section>
	);
}
