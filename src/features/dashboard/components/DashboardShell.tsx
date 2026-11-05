import type { ReactNode } from "react";
import type { NavItem } from "../domain/nav-item.model";
import { DashboardFrame } from "./DashboardFrame";
import { SidebarProvider } from "./SidebarProvider";

type DashboardShellProps = {
	navItems: readonly NavItem[];
	children: ReactNode;
};

export function DashboardShell({ navItems, children }: DashboardShellProps) {
	return (
		<SidebarProvider>
			<DashboardFrame navItems={navItems}>{children}</DashboardFrame>
		</SidebarProvider>
	);
}
