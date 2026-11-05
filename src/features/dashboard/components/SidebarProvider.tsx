import type { ReactNode } from "react";
import {
	SidebarActionsContext,
	SidebarStateContext,
} from "../context/sidebar.context";
import { useSidebarController } from "../hooks/useSidebarController";

type SidebarProviderProps = {
	children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
	const { state, actions } = useSidebarController();

	return (
		<SidebarActionsContext value={actions}>
			<SidebarStateContext value={state}>{children}</SidebarStateContext>
		</SidebarActionsContext>
	);
}
