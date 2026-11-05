import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { SidebarActionsContext } from "../context/sidebar.context";

export function useSidebarActions() {
	return useRequiredContext(SidebarActionsContext, "useSidebarActions");
}
