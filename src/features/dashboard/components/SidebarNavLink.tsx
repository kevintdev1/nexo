import { cn } from "@shared/utils/cn";
import { NavLink } from "react-router";
import { FALLBACK_NAV_ICON, NAV_ICONS } from "../constants/nav-icons";
import { useSidebarActions } from "../hooks/useSidebarActions";
import { useSidebarState } from "../hooks/useSidebarState";
import {
	NAV_ENTRY_ACTIVE_CLASSES,
	NAV_ENTRY_CLASSES,
	NAV_ENTRY_IDLE_CLASSES,
} from "./navigation.styles";

type SidebarNavLinkProps = {
	name: string;
	path: string;
};

export function SidebarNavLink({ name, path }: SidebarNavLinkProps) {
	const { isLabelVisible } = useSidebarState();
	const { closeMobile } = useSidebarActions();
	const Icon = NAV_ICONS[name] ?? FALLBACK_NAV_ICON;

	return (
		<NavLink
			to={path}
			end
			onClick={closeMobile}
			aria-label={isLabelVisible ? undefined : name}
			className={({ isActive }) =>
				cn(
					NAV_ENTRY_CLASSES,
					isActive ? NAV_ENTRY_ACTIVE_CLASSES : NAV_ENTRY_IDLE_CLASSES,
				)
			}
		>
			<Icon aria-hidden className="size-6 shrink-0" />
			{isLabelVisible && <span>{name}</span>}
		</NavLink>
	);
}
