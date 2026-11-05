import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type Role, requiresInstitution } from "../domain/role.model";
import {
	createInviteUserSchema,
	type InviteUserFormValues,
	type InviteUserInput,
} from "../schemas/users.schema";
import { useInviteUser } from "./useInviteUser";

const EMPTY_INVITATION: InviteUserFormValues = {
	email: "",
	firstName: "",
	lastName: "",
	roleId: "",
	institutionId: "",
};

export function useInviteUserForm(roles: readonly Role[], onDone: () => void) {
	const roleIdsRequiringInstitution = useMemo(
		() => roles.filter(requiresInstitution).map((role) => role.id),
		[roles],
	);
	const schema = useMemo(
		() => createInviteUserSchema(roleIdsRequiringInstitution),
		[roleIdsRequiringInstitution],
	);
	const form = useForm<InviteUserFormValues, unknown, InviteUserInput>({
		resolver: zodResolver(schema),
		defaultValues: EMPTY_INVITATION,
	});
	const { mutateAsync } = useInviteUser();

	const inviteUser = useConfirmedMutation({
		mutate: mutateAsync,
		getConfirmation: (input: InviteUserInput) => ({
			title: "¿Enviar invitación?",
			description: `Se enviará una invitación a ${input.email}.`,
			confirmLabel: "Sí, enviar",
		}),
		messages: {
			loading: "Enviando invitación…",
			success: "Invitación enviada.",
			error: "No se pudo enviar la invitación.",
		},
	});

	const close = () => {
		form.reset();
		onDone();
	};

	const onSubmit = form.handleSubmit(async (input) => {
		if (await inviteUser(input)) close();
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		isInstitutionRequired: roleIdsRequiringInstitution.includes(
			form.watch("roleId"),
		),
		onSubmit,
		close,
	};
}
