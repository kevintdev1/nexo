import { cn } from "@shared/utils/cn";
import type { ReactNode } from "react";
import type { NavItem } from "../domain/nav-item.model";
import { useSidebarState } from "../hooks/useSidebarState";
import { DashboardHeader } from "./DashboardHeader";
import { Sidebar } from "./Sidebar";

type DashboardFrameProps = {
	navItems: readonly NavItem[];
	children: ReactNode;
};

export function DashboardFrame({ navItems, children }: DashboardFrameProps) {
	const { isExpanded } = useSidebarState();

	return (
		<div className="flex h-screen">
			<Sidebar navItems={navItems} />
			<div
				className={cn(
					"flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-in-out",
					isExpanded ? "lg:ml-sidebar" : "lg:ml-sidebar-collapsed",
				)}
			>
				<DashboardHeader />
				<main className="flex-1 overflow-auto p-4 md:p-6">
					<div className="mx-auto w-full max-w-screen-2xl">{children}</div>
				</main>
			</div>
		</div>
	);
}
