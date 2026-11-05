import { type RefObject, useEffect } from "react";

const AUTOFOCUS_SELECTOR = "[data-autofocus]";
const FIRST_FIELD_SELECTOR = "input:not([type='hidden']), select, textarea";

function findInitialFocus(dialog: HTMLDialogElement) {
	return (
		dialog.querySelector<HTMLElement>(AUTOFOCUS_SELECTOR) ??
		dialog.querySelector<HTMLElement>(FIRST_FIELD_SELECTOR)
	);
}

export function useDialogSync(
	dialogRef: RefObject<HTMLDialogElement | null>,
	isOpen: boolean,
) {
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !isOpen) return;

		const previouslyFocused =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		if (!dialog.open) dialog.showModal();
		findInitialFocus(dialog)?.focus();

		return () => {
			if (dialog.open) dialog.close();
			previouslyFocused?.focus();
		};
	}, [dialogRef, isOpen]);
}
