import { DESKTOP_MEDIA_QUERY } from "@shared/constants/media-queries";
import { useMediaQuery } from "@shared/hooks/useMediaQuery";
import { useMemo, useState } from "react";
import type { SidebarActions, SidebarState } from "../context/sidebar.context";

export function useSidebarController() {
	const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
	const [isExpanded, setIsExpanded] = useState(true);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const state: SidebarState = {
		isExpanded: isDesktop && isExpanded,
		isMobileOpen: !isDesktop && isMobileOpen,
		isLabelVisible: isDesktop ? isExpanded || isHovered : isMobileOpen,
		isHidden: !isDesktop && !isMobileOpen,
	};

	const actions = useMemo<SidebarActions>(
		() => ({
			toggle: () =>
				isDesktop
					? setIsExpanded((current) => !current)
					: setIsMobileOpen((current) => !current),
			closeMobile: () => setIsMobileOpen(false),
			setHovered: setIsHovered,
		}),
		[isDesktop],
	);

	return { state, actions };
}
