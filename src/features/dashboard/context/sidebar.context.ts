import { createContext } from "react";

export type SidebarState = {
	isExpanded: boolean;
	isMobileOpen: boolean;
	isLabelVisible: boolean;
	isHidden: boolean;
};

export type SidebarActions = {
	toggle: () => void;
	closeMobile: () => void;
	setHovered: (isHovered: boolean) => void;
};

export const SidebarStateContext = createContext<SidebarState | null>(null);
export const SidebarActionsContext = createContext<SidebarActions | null>(null);
