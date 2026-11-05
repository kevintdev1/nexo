import { cn } from "@shared/utils/cn";
import { LuEllipsis } from "react-icons/lu";
import type { NavItem } from "../domain/nav-item.model";
import { useSidebarActions } from "../hooks/useSidebarActions";
import { useSidebarState } from "../hooks/useSidebarState";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";

type SidebarProps = {
	navItems: readonly NavItem[];
};

export function Sidebar({ navItems }: SidebarProps) {
	const { isMobileOpen, isLabelVisible, isHidden } = useSidebarState();
	const { setHovered } = useSidebarActions();

	return (
		<aside
			aria-label="Navegación principal"
			inert={isHidden}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn(
				"fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col gap-8 border-border border-r bg-surface px-5 text-muted-foreground transition-all duration-300 ease-in-out lg:mt-0 lg:translate-x-0",
				isLabelVisible ? "w-sidebar" : "w-sidebar-collapsed",
				isMobileOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			<SidebarHeader />
			<div className="flex flex-col overflow-y-auto">
				<h2
					className={cn(
						"mb-5 flex text-xs uppercase",
						isLabelVisible ? "justify-start" : "justify-center",
					)}
				>
					<span className={cn(!isLabelVisible && "sr-only")}>Menú</span>
					{!isLabelVisible && <LuEllipsis aria-hidden className="size-6" />}
				</h2>
				<SidebarNav navItems={navItems} />
			</div>
		</aside>
	);
}
