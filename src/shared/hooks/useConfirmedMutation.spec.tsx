import { TestProviders } from "@test/TestProviders";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useConfirmedMutation } from "./useConfirmedMutation";

vi.mock("sonner", () => ({ toast: { promise: vi.fn() } }));

type DeleteButtonProps = {
	mutate: (id: string) => Promise<void>;
	onResult: (isDone: boolean) => void;
};

function DeleteButton({ mutate, onResult }: DeleteButtonProps) {
	const remove = useConfirmedMutation({
		mutate,
		getConfirmation: (id: string) => ({
			title: "¿Eliminar?",
			description: `Se eliminará ${id}.`,
			confirmLabel: "Sí, eliminar",
		}),
		messages: { loading: "…", success: "Listo", error: "Error" },
	});

	return (
		<button
			type="button"
			onClick={async () => onResult(await remove("item-1"))}
		>
			Eliminar
		</button>
	);
}

function renderDeleteButton(mutate: DeleteButtonProps["mutate"]) {
	const onResult = vi.fn();
	render(
		<TestProviders>
			<DeleteButton mutate={mutate} onResult={onResult} />
		</TestProviders>,
	);
	return onResult;
}

describe("useConfirmedMutation", () => {
	it("runs the mutation once the user confirms", async () => {
		const user = userEvent.setup();
		const mutate = vi.fn(async () => {});
		const onResult = renderDeleteButton(mutate);

		await user.click(screen.getByRole("button", { name: "Eliminar" }));
		expect(await screen.findByText("Se eliminará item-1.")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Sí, eliminar" }));

		await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith(true));
		expect(mutate).toHaveBeenCalledWith("item-1");
	});

	it("does nothing when the user cancels", async () => {
		const user = userEvent.setup();
		const mutate = vi.fn(async () => {});
		const onResult = renderDeleteButton(mutate);

		await user.click(screen.getByRole("button", { name: "Eliminar" }));
		await user.click(await screen.findByRole("button", { name: "Cancelar" }));

		await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
		expect(mutate).not.toHaveBeenCalled();
	});

	it("reports failure when the mutation rejects", async () => {
		const user = userEvent.setup();
		const mutate = vi.fn(async () => {
			throw new Error("boom");
		});
		const onResult = renderDeleteButton(mutate);

		await user.click(screen.getByRole("button", { name: "Eliminar" }));
		await user.click(
			await screen.findByRole("button", { name: "Sí, eliminar" }),
		);

		await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
	});
});
