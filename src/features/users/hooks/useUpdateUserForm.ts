import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useForm } from "react-hook-form";
import { getUserFullName, type User } from "../domain/user.model";
import {
	type UpdateUserFormValues,
	type UpdateUserInput,
	updateUserSchema,
} from "../schemas/users.schema";
import { useUpdateUser } from "./useUpdateUser";

export function useUpdateUserForm(user: User, onDone: () => void) {
	const form = useForm<UpdateUserFormValues, unknown, UpdateUserInput>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			nationalId: user.nationalId ?? "",
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone ?? "",
		},
	});
	const { mutateAsync } = useUpdateUser();

	const updateUser = useConfirmedMutation({
		mutate: (input: UpdateUserInput) => mutateAsync({ id: user.id, input }),
		getConfirmation: (input) => ({
			title: "¿Guardar cambios?",
			description: `Se actualizarán los datos de ${getUserFullName(input)}.`,
			confirmLabel: "Sí, guardar",
		}),
		messages: {
			loading: "Guardando cambios…",
			success: "Usuario actualizado con éxito.",
			error: "No se pudo actualizar el usuario.",
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		if (await updateUser(input)) onDone();
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
	};
}
