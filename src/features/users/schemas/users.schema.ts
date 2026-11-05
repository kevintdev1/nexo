import {
	optionalField,
	requiredSelectField,
} from "@shared/validations/common.fields";
import {
	emailField,
	firstNameField,
	lastNameField,
	nationalIdField,
	phoneField,
} from "@shared/validations/person.fields";
import { z } from "zod";

const inviteUserFieldsSchema = z.object({
	email: emailField,
	firstName: firstNameField,
	lastName: lastNameField,
	roleId: requiredSelectField,
	institutionId: z.string(),
});

export function createInviteUserSchema(
	roleIdsRequiringInstitution: readonly string[],
) {
	const needsInstitution = (roleId: string) =>
		roleIdsRequiringInstitution.includes(roleId);

	return inviteUserFieldsSchema
		.refine(
			(values) =>
				!needsInstitution(values.roleId) || values.institutionId.length > 0,
			{
				error: "Debes seleccionar una unidad educativa.",
				path: ["institutionId"],
			},
		)
		.transform((values) => ({
			...values,
			institutionId: needsInstitution(values.roleId)
				? values.institutionId
				: null,
		}));
}

export const updateUserSchema = z.object({
	nationalId: optionalField(nationalIdField),
	email: emailField,
	firstName: firstNameField,
	lastName: lastNameField,
	phone: optionalField(phoneField),
});

export type InviteUserFormValues = z.input<typeof inviteUserFieldsSchema>;
export type InviteUserInput = z.output<
	ReturnType<typeof createInviteUserSchema>
>;
export type UpdateUserFormValues = z.input<typeof updateUserSchema>;
export type UpdateUserInput = z.output<typeof updateUserSchema>;
