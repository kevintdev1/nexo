import { IconButton } from "@ui/IconButton";
import { LuText, LuX } from "react-icons/lu";
import { useSidebarActions } from "../hooks/useSidebarActions";
import { useSidebarState } from "../hooks/useSidebarState";

export function SidebarToggleButton() {
	const { isMobileOpen } = useSidebarState();
	const { toggle } = useSidebarActions();

	return (
		<IconButton
			icon={
				isMobileOpen ? (
					<LuX className="size-5" />
				) : (
					<LuText className="size-5" />
				)
			}
			label={isMobileOpen ? "Cerrar menú" : "Alternar menú"}
			onClick={toggle}
			className="rounded-lg lg:size-11 lg:border lg:border-border"
		/>
	);
}
