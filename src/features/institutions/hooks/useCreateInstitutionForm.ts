import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useForm } from "react-hook-form";
import {
	type CreateInstitutionFormValues,
	type CreateInstitutionInput,
	createInstitutionSchema,
} from "../schemas/institutions.schema";
import { useCreateInstitution } from "./useCreateInstitution";

export function useCreateInstitutionForm(onDone: () => void) {
	const form = useForm<
		CreateInstitutionFormValues,
		unknown,
		CreateInstitutionInput
	>({
		resolver: zodResolver(createInstitutionSchema),
		defaultValues: { name: "", cityId: "" },
	});
	const { mutateAsync } = useCreateInstitution();

	const createInstitution = useConfirmedMutation({
		mutate: mutateAsync,
		getConfirmation: (input: CreateInstitutionInput) => ({
			title: "¿Afiliar unidad educativa?",
			description: `Se afiliará "${input.name}" y quedará registrada en el sistema.`,
			confirmLabel: "Sí, registrar",
		}),
		messages: {
			loading: "Registrando unidad educativa…",
			success: "Unidad educativa afiliada con éxito.",
			error: "No se pudo registrar la unidad educativa.",
		},
	});

	const close = () => {
		form.reset();
		onDone();
	};

	const onSubmit = form.handleSubmit(async (input) => {
		if (await createInstitution(input)) close();
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
		close,
	};
}
