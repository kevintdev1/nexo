import { type RefObject, useEffect } from "react";

export function useInitialFocus(
	containerRef: RefObject<HTMLElement | null>,
	isActive: boolean,
	selector: string,
) {
	useEffect(() => {
		if (isActive)
			containerRef.current?.querySelector<HTMLElement>(selector)?.focus();
	}, [containerRef, isActive, selector]);
}
