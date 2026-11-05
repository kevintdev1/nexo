import {
	type CSSProperties,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

const PANEL_GAP_PX = 8;

export function usePopover<TTrigger extends HTMLElement = HTMLButtonElement>() {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<CSSProperties>({});
	const triggerRef = useRef<TTrigger>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const panelId = useId();

	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((current) => !current), []);

	const closeAndRestoreFocus = useCallback(() => {
		setIsOpen(false);
		triggerRef.current?.focus();
	}, []);

	useLayoutEffect(() => {
		if (!isOpen || !triggerRef.current) return;
		const rect = triggerRef.current.getBoundingClientRect();
		const viewport = document.documentElement;
		const panelHeight = panelRef.current?.offsetHeight ?? 0;
		const fitsBelow =
			rect.bottom + PANEL_GAP_PX + panelHeight <= viewport.clientHeight;

		setPosition({
			right: viewport.clientWidth - rect.right,
			...(fitsBelow
				? { top: rect.bottom + PANEL_GAP_PX }
				: { bottom: viewport.clientHeight - rect.top + PANEL_GAP_PX }),
		});
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const isInside = (target: EventTarget | null) =>
			target instanceof Node &&
			Boolean(
				triggerRef.current?.contains(target) ||
					panelRef.current?.contains(target),
			);

		const handlePointerDown = (event: PointerEvent) => {
			if (!isInside(event.target)) close();
		};
		const handleScroll = (event: Event) => {
			if (!isInside(event.target)) close();
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeAndRestoreFocus();
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("scroll", handleScroll, true);
		document.addEventListener("keydown", handleKeyDown);
		window.addEventListener("resize", close);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("scroll", handleScroll, true);
			document.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("resize", close);
		};
	}, [isOpen, close, closeAndRestoreFocus]);

	return {
		isOpen,
		toggle,
		close,
		closeAndRestoreFocus,
		triggerRef,
		panelRef,
		panelId,
		position,
	};
}
