import type { ConfirmOptions } from "@shared/context/confirm.context";
import { getErrorMessage } from "@shared/utils/get-error-message";
import { toast } from "sonner";
import { useConfirm } from "./useConfirm";

export type MutationMessages = {
	loading: string;
	success: string;
	error: string;
};

type ConfirmedMutationOptions<TVariables> = {
	mutate: (variables: TVariables) => Promise<unknown>;
	getConfirmation: (variables: TVariables) => ConfirmOptions;
	messages: MutationMessages;
	resolveErrorMessage?: (error: unknown) => string | null;
};

export function useConfirmedMutation<TVariables>({
	mutate,
	getConfirmation,
	messages,
	resolveErrorMessage = () => null,
}: ConfirmedMutationOptions<TVariables>) {
	const confirm = useConfirm();

	return async (variables: TVariables): Promise<boolean> => {
		const isConfirmed = await confirm(getConfirmation(variables));
		if (!isConfirmed) return false;

		const mutation = mutate(variables);
		toast.promise(mutation, {
			loading: messages.loading,
			success: messages.success,
			error: (error: unknown) =>
				resolveErrorMessage(error) ?? getErrorMessage(error, messages.error),
		});

		try {
			await mutation;
			return true;
		} catch {
			return false;
		}
	};
}
