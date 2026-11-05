import { ConfirmContext } from "@shared/context/confirm.context";
import { useConfirmController } from "@shared/hooks/useConfirmController";
import { ConfirmDialog } from "@ui/ConfirmDialog";
import type { ReactNode } from "react";

type ConfirmProviderProps = {
	children: ReactNode;
};

export function ConfirmProvider({ children }: ConfirmProviderProps) {
	const { confirm, options, accept, reject } = useConfirmController();

	return (
		<ConfirmContext value={confirm}>
			{children}
			{options && (
				<ConfirmDialog {...options} onConfirm={accept} onCancel={reject} />
			)}
		</ConfirmContext>
	);
}
