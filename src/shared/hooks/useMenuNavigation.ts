import type { KeyboardEvent, RefObject } from "react";
import { useInitialFocus } from "./useInitialFocus";

const MENU_ITEM_SELECTOR = '[role="menuitem"]';

const NAVIGATION_STEPS: Readonly<Record<string, number>> = {
	ArrowDown: 1,
	ArrowUp: -1,
};

function getMenuItems(menu: HTMLElement | null) {
	return Array.from(
		menu?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR) ?? [],
	);
}

function getFocusedIndex(items: readonly HTMLElement[]) {
	const focused = document.activeElement;
	return focused instanceof HTMLElement ? items.indexOf(focused) : -1;
}

export function useMenuNavigation(
	menuRef: RefObject<HTMLElement | null>,
	isOpen: boolean,
	onTab: () => void,
) {
	useInitialFocus(menuRef, isOpen, MENU_ITEM_SELECTOR);

	return (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Tab") return onTab();

		const step = NAVIGATION_STEPS[event.key];
		if (step === undefined) return;

		event.preventDefault();
		const items = getMenuItems(menuRef.current);
		const nextIndex =
			(getFocusedIndex(items) + step + items.length) % items.length;
		items[nextIndex]?.focus();
	};
}
