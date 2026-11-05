import { type Context, useContext } from "react";

export function useRequiredContext<T>(
	context: Context<T | null>,
	name: string,
): T {
	const value = useContext(context);
	if (value === null)
		throw new Error(`${name} must be used within its provider`);
	return value;
}
