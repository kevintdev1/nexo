import type { Confirm, ConfirmOptions } from "@shared/context/confirm.context";
import { useCallback, useRef, useState } from "react";

type Resolve = (isConfirmed: boolean) => void;

export function useConfirmController() {
	const [options, setOptions] = useState<ConfirmOptions | null>(null);
	const resolveRef = useRef<Resolve | null>(null);

	const settle = useCallback((isConfirmed: boolean) => {
		resolveRef.current?.(isConfirmed);
		resolveRef.current = null;
		setOptions(null);
	}, []);

	const confirm = useCallback<Confirm>(
		(nextOptions) =>
			new Promise((resolve) => {
				resolveRef.current?.(false);
				resolveRef.current = resolve;
				setOptions(nextOptions);
			}),
		[],
	);

	return {
		confirm,
		options,
		accept: () => settle(true),
		reject: () => settle(false),
	};
}
