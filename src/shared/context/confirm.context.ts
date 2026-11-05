import { createContext } from "react";

export type ConfirmTone = "primary" | "danger";

export type ConfirmOptions = {
	title: string;
	description: string;
	confirmLabel: string;
	tone?: ConfirmTone;
};

export type Confirm = (options: ConfirmOptions) => Promise<boolean>;

export const ConfirmContext = createContext<Confirm | null>(null);
