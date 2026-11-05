import { cn } from "@shared/utils/cn";
import { useId } from "react";
import { LuChevronDown } from "react-icons/lu";
import { NavLink } from "react-router";
import { FALLBACK_NAV_ICON, NAV_ICONS } from "../constants/nav-icons";
import type { NavItem } from "../domain/nav-item.model";
import { useNavGroup } from "../hooks/useNavGroup";
import { useSidebarActions } from "../hooks/useSidebarActions";
import { useSidebarState } from "../hooks/useSidebarState";
import {
	NAV_ENTRY_ACTIVE_CLASSES,
	NAV_ENTRY_CLASSES,
	NAV_ENTRY_IDLE_CLASSES,
} from "./navigation.styles";

type SidebarNavGroupProps = {
	item: Pick<NavItem, "name" | "children">;
};

export function SidebarNavGroup({ item }: SidebarNavGroupProps) {
	const { isLabelVisible } = useSidebarState();
	const { closeMobile } = useSidebarActions();
	const { isOpen, toggle } = useNavGroup(item.children);
	const submenuId = useId();
	const Icon = NAV_ICONS[item.name] ?? FALLBACK_NAV_ICON;
	const isSubmenuVisible = isLabelVisible && isOpen;

	return (
		<>
			<button
				type="button"
				onClick={toggle}
				aria-expanded={isSubmenuVisible}
				aria-controls={submenuId}
				aria-label={isLabelVisible ? undefined : item.name}
				className={cn(
					NAV_ENTRY_CLASSES,
					isOpen ? NAV_ENTRY_ACTIVE_CLASSES : NAV_ENTRY_IDLE_CLASSES,
				)}
			>
				<Icon aria-hidden className="size-6 shrink-0" />
				{isLabelVisible && (
					<>
						<span>{item.name}</span>
						<LuChevronDown
							aria-hidden
							className={cn(
								"ml-auto size-5 transition-transform duration-200",
								isOpen && "rotate-180",
							)}
						/>
					</>
				)}
			</button>
			<div
				id={submenuId}
				className={cn(
					"grid transition-[grid-template-rows] duration-300",
					isSubmenuVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
			>
				<ul
					className="mt-2 ml-9 flex flex-col gap-1 overflow-hidden"
					inert={!isSubmenuVisible}
				>
					{item.children.map(
						(child) =>
							child.path && (
								<li key={child.name}>
									<NavLink
										to={child.path}
										end
										onClick={closeMobile}
										className={({ isActive }) =>
											cn(
												"flex rounded-lg px-3 py-2.5 font-medium",
												isActive
													? NAV_ENTRY_ACTIVE_CLASSES
													: NAV_ENTRY_IDLE_CLASSES,
											)
										}
									>
										{child.name}
									</NavLink>
								</li>
							),
					)}
				</ul>
			</div>
		</>
	);
}
