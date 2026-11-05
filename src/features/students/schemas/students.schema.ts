import { toIsoDate } from "@shared/utils/format-date";
import { requiredSelectField } from "@shared/validations/common.fields";
import {
	firstNameField,
	lastNameField,
	nationalIdField,
} from "@shared/validations/person.fields";
import { z } from "zod";
import { BLOOD_TYPES, GENDERS } from "../domain/student.model";

const ENROLMENT_NUMBER_PATTERN = /^[A-Z0-9-]+$/;
const INVALID_OPTION_ERROR = "Selecciona una opción válida.";
const IMAGE_MIME_PREFIX = "image/";

const photoField = z
	.custom<FileList | undefined>(
		(value) => value === undefined || value instanceof FileList,
		{ error: "Selecciona un archivo válido." },
	)
	.transform((files) => files?.item(0) ?? undefined)
	.refine((file) => !file || file.type.startsWith(IMAGE_MIME_PREFIX), {
		error: "La foto debe ser una imagen.",
	});

export const studentSchema = z.object({
	photo: photoField,
	nationalId: nationalIdField,
	firstName: firstNameField,
	lastName: lastNameField,
	dateOfBirth: z.iso
		.date({ error: "La fecha de nacimiento es obligatoria." })
		.refine((date) => date <= toIsoDate(new Date()), {
			error: "La fecha de nacimiento no puede ser futura.",
		}),
	bloodType: requiredSelectField.pipe(
		z.enum(BLOOD_TYPES, { error: INVALID_OPTION_ERROR }),
	),
	gender: requiredSelectField.pipe(
		z.enum(GENDERS, { error: INVALID_OPTION_ERROR }),
	),
	enrolmentNumber: z
		.string()
		.trim()
		.min(3, {
			error: "El número de matrícula debe tener al menos 3 caracteres.",
		})
		.max(20, { error: "El número de matrícula no debe exceder 20 caracteres." })
		.regex(ENROLMENT_NUMBER_PATTERN, {
			error:
				"El número de matrícula solo puede contener letras mayúsculas, números y guiones.",
		}),
});

export type StudentFormValues = z.input<typeof studentSchema>;
export type StudentInput = z.output<typeof studentSchema>;
