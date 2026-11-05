import { useState } from "react";
import { useLocation } from "react-router";
import type { NavItem } from "../domain/nav-item.model";

export function useNavGroup(children: readonly NavItem[]) {
	const { pathname } = useLocation();
	const [openOverride, setOpenOverride] = useState<boolean | null>(null);

	const hasActiveChild = children.some((child) => child.path === pathname);
	const isOpen = openOverride ?? hasActiveChild;

	const toggle = () => setOpenOverride(!isOpen);

	return { isOpen, hasActiveChild, toggle };
}
