import {
	collapseSpaces,
	requiredSelectField,
} from "@shared/validations/common.fields";
import { z } from "zod";
import { INSTITUTION_STATUSES } from "../domain/institution.model";

const INSTITUTION_NAME_PATTERN = /^[\p{L}\p{N}\s.,\-()&/]+$/u;

const institutionNameField = z
	.string()
	.trim()
	.min(3, { error: "El nombre debe tener al menos 3 caracteres." })
	.max(100, { error: "El nombre no debe exceder los 100 caracteres." })
	.regex(INSTITUTION_NAME_PATTERN, {
		error:
			"El nombre solo puede contener letras, números, espacios y . , - ( ) & /",
	})
	.transform(collapseSpaces);

export const createInstitutionSchema = z.object({
	name: institutionNameField,
	cityId: requiredSelectField,
});

export const updateInstitutionSchema = createInstitutionSchema.extend({
	status: z.enum(INSTITUTION_STATUSES, {
		error: "Debes seleccionar una opción.",
	}),
});

export type CreateInstitutionFormValues = z.input<
	typeof createInstitutionSchema
>;
export type CreateInstitutionInput = z.output<typeof createInstitutionSchema>;
export type UpdateInstitutionFormValues = z.input<
	typeof updateInstitutionSchema
>;
export type UpdateInstitutionInput = z.output<typeof updateInstitutionSchema>;
