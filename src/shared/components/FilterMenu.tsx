import type { Filter, FilterValues } from "@shared/filters/filter.types";
import { useInitialFocus } from "@shared/hooks/useInitialFocus";
import { usePopover } from "@shared/hooks/usePopover";
import { Button } from "@ui/Button";
import { PopoverPanel } from "@ui/PopoverPanel";
import type { FocusEvent } from "react";
import { LuFilter } from "react-icons/lu";

const FOCUSABLE_SELECTOR = "button, summary, input";

type FilterMenuProps<TItem> = {
	filters: readonly Filter<TItem>[];
	values: FilterValues;
	activeCount: number;
	onChange: (key: string, value: unknown) => void;
	onReset: () => void;
};

export function FilterMenu<TItem>({
	filters,
	values,
	activeCount,
	onChange,
	onReset,
}: FilterMenuProps<TItem>) {
	const { isOpen, toggle, close, triggerRef, panelRef, panelId, position } =
		usePopover();
	useInitialFocus(panelRef, isOpen, FOCUSABLE_SELECTOR);

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		const nextFocus = event.relatedTarget;
		if (nextFocus && !event.currentTarget.contains(nextFocus)) close();
	};

	return (
		<>
			<div className="relative">
				<Button
					ref={triggerRef}
					variant="accent"
					aria-label="Filtros"
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					aria-controls={isOpen ? panelId : undefined}
					onClick={toggle}
					className="h-10.5"
				>
					<LuFilter />
				</Button>
				{activeCount > 0 && (
					<span className="-top-1 -right-1 absolute rounded-full bg-info px-1.5 py-px font-bold text-[10px] text-info-foreground">
						{activeCount}
					</span>
				)}
			</div>

			{isOpen && (
				<PopoverPanel
					ref={panelRef}
					id={panelId}
					role="dialog"
					aria-label="Panel de filtros"
					onBlur={handleBlur}
					style={position}
					className="max-h-[80vh] w-72 overflow-auto rounded-lg border border-border bg-surface p-2 shadow-xl"
				>
					<header className="flex items-center justify-between px-2 py-1">
						<h3 className="font-semibold">Filtros</h3>
						<button
							type="button"
							onClick={onReset}
							className="cursor-pointer text-primary-soft-foreground text-xs hover:underline"
						>
							Borrar todo
						</button>
					</header>
					<div className="divide-y divide-border">
						{filters.map((filter) => (
							<details key={filter.key} open className="py-1">
								<summary className="cursor-pointer rounded px-2 py-1 font-medium hover:bg-muted">
									{filter.label}
								</summary>
								<div className="px-2 py-1">
									{filter.renderControl(values[filter.key], (value) =>
										onChange(filter.key, value),
									)}
								</div>
							</details>
						))}
					</div>
				</PopoverPanel>
			)}
		</>
	);
}
