import type { ReactNode } from "react";
import { Button } from "./Button";

type CreateButtonProps = {
	label: string;
	icon: ReactNode;
	onClick: () => void;
};

export function CreateButton({ label, icon, onClick }: CreateButtonProps) {
	return (
		<Button
			variant="success"
			aria-label={label}
			title={label}
			onClick={onClick}
		>
			{icon}
		</Button>
	);
}
