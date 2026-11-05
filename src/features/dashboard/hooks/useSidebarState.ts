import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { SidebarStateContext } from "../context/sidebar.context";

export function useSidebarState() {
	return useRequiredContext(SidebarStateContext, "useSidebarState");
}
