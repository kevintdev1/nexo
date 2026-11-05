import type { ConfirmOptions } from "@shared/context/confirm.context";
import { Button } from "./Button";
import { Modal } from "./Modal";

type ConfirmDialogProps = ConfirmOptions & {
	onConfirm: () => void;
	onCancel: () => void;
};

export function ConfirmDialog({
	title,
	description,
	confirmLabel,
	tone = "primary",
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<Modal
			isOpen
			onClose={onCancel}
			title={title}
			description={description}
			size="md"
		>
			<footer className="flex flex-row-reverse gap-2">
				<Button variant={tone} onClick={onConfirm} data-autofocus>
					{confirmLabel}
				</Button>
				<Button variant="ghost" onClick={onCancel}>
					Cancelar
				</Button>
			</footer>
		</Modal>
	);
}
