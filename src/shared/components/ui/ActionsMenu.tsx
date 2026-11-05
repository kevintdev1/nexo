import { useMenuNavigation } from "@shared/hooks/useMenuNavigation";
import { usePopover } from "@shared/hooks/usePopover";
import { cn } from "@shared/utils/cn";
import type { ReactNode } from "react";
import { LuEllipsis } from "react-icons/lu";
import { IconButton } from "./IconButton";
import { PopoverPanel } from "./PopoverPanel";

const TONES = {
	default: "text-foreground hover:bg-muted focus-visible:bg-muted",
	danger: "text-danger hover:bg-danger-soft focus-visible:bg-danger-soft",
} as const;

export type MenuAction = {
	label: string;
	icon: ReactNode;
	onSelect: () => void;
	tone?: keyof typeof TONES;
};

type ActionsMenuProps = {
	label: string;
	actions: readonly MenuAction[];
	disabled?: boolean;
};

export function ActionsMenu({
	label,
	actions,
	disabled = false,
}: ActionsMenuProps) {
	const {
		isOpen,
		toggle,
		close,
		closeAndRestoreFocus,
		triggerRef,
		panelRef,
		panelId,
		position,
	} = usePopover();
	const handleKeyDown = useMenuNavigation(panelRef, isOpen, close);

	const handleSelect = (action: MenuAction) => {
		closeAndRestoreFocus();
		action.onSelect();
	};

	return (
		<>
			<IconButton
				ref={triggerRef}
				icon={<LuEllipsis className="size-5" />}
				label={label}
				disabled={disabled}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls={isOpen ? panelId : undefined}
				onClick={toggle}
			/>
			{isOpen && (
				<PopoverPanel
					ref={panelRef}
					id={panelId}
					role="menu"
					aria-label={label}
					onKeyDown={handleKeyDown}
					style={position}
					className="w-40 rounded-md border border-border bg-surface py-1 shadow-lg"
				>
					{actions.map((action) => (
						<button
							key={action.label}
							type="button"
							role="menuitem"
							tabIndex={-1}
							onClick={() => handleSelect(action)}
							className={cn(
								"flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm outline-none",
								TONES[action.tone ?? "default"],
							)}
						>
							{action.icon}
							{action.label}
						</button>
					))}
				</PopoverPanel>
			)}
		</>
	);
}
