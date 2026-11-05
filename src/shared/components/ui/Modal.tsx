import { useBodyScrollLock } from "@shared/hooks/useBodyScrollLock";
import { useDialogSync } from "@shared/hooks/useDialogSync";
import { cn } from "@shared/utils/cn";
import { type ReactNode, useId, useRef } from "react";
import { LuX } from "react-icons/lu";
import { IconButton } from "./IconButton";

const SIZES = {
	md: "max-w-md",
	lg: "max-w-xl",
} as const;

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	size?: keyof typeof SIZES;
	children: ReactNode;
};

export function Modal({
	isOpen,
	onClose,
	title,
	description,
	size = "lg",
	children,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();

	useBodyScrollLock(isOpen);
	useDialogSync(dialogRef, isOpen);

	const handleNativeClose = () => {
		if (isOpen) onClose();
	};

	return (
		<dialog
			ref={dialogRef}
			closedby="any"
			aria-labelledby={titleId}
			aria-describedby={description ? descriptionId : undefined}
			onClose={handleNativeClose}
			className={cn(
				"m-auto w-full rounded-xl bg-surface p-0 text-foreground shadow-lg backdrop:bg-overlay backdrop:backdrop-blur-xl",
				SIZES[size],
			)}
		>
			<div className="relative flex flex-col gap-8 p-6">
				<header className="pr-10">
					<h2 id={titleId} className="font-bold text-xl">
						{title}
					</h2>
					{description && (
						<p id={descriptionId} className="text-muted-foreground">
							{description}
						</p>
					)}
				</header>
				<IconButton
					icon={<LuX className="size-5" />}
					label="Cerrar"
					onClick={onClose}
					className="absolute top-3 right-3 size-8 bg-muted"
				/>
				{children}
			</div>
		</dialog>
	);
}
