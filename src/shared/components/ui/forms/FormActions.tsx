import { Button } from "../Button";

type FormActionsProps = {
	submitLabel: string;
	isSubmitting: boolean;
	onCancel: () => void;
};

export function FormActions({
	submitLabel,
	isSubmitting,
	onCancel,
}: FormActionsProps) {
	return (
		<footer className="flex flex-row-reverse gap-2 pt-4">
			<Button type="submit" isLoading={isSubmitting}>
				{submitLabel}
			</Button>
			<Button variant="ghost" onClick={onCancel}>
				Cerrar
			</Button>
		</footer>
	);
}
