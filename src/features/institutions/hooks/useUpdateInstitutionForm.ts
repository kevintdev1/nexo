import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useForm } from "react-hook-form";
import type { Institution } from "../domain/institution.model";
import {
	type UpdateInstitutionFormValues,
	type UpdateInstitutionInput,
	updateInstitutionSchema,
} from "../schemas/institutions.schema";
import { useUpdateInstitution } from "./useUpdateInstitution";

export function useUpdateInstitutionForm(
	institution: Institution,
	onDone: () => void,
) {
	const form = useForm<
		UpdateInstitutionFormValues,
		unknown,
		UpdateInstitutionInput
	>({
		resolver: zodResolver(updateInstitutionSchema),
		defaultValues: {
			name: institution.name,
			cityId: institution.cityId ?? "",
			status: institution.status,
		},
	});
	const { mutateAsync } = useUpdateInstitution();

	const updateInstitution = useConfirmedMutation({
		mutate: (input: UpdateInstitutionInput) =>
			mutateAsync({ id: institution.id, input }),
		getConfirmation: (input) => ({
			title: "¿Guardar cambios?",
			description: `Se actualizará la información de "${input.name}".`,
			confirmLabel: "Sí, guardar",
		}),
		messages: {
			loading: "Guardando cambios…",
			success: "Unidad educativa actualizada con éxito.",
			error: "No se pudo actualizar la unidad educativa.",
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		if (await updateInstitution(input)) onDone();
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
	};
}
