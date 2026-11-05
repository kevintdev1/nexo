import { z } from "zod";
import { collapseSpaces } from "./common.fields";

const ONLY_LETTERS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const TEN_DIGITS = /^\d{10}$/;

export const emailField = z
	.string()
	.trim()
	.min(1, { error: "El correo es un campo obligatorio." })
	.max(100, { error: "El correo no debe exceder los 100 caracteres." })
	.pipe(z.email({ error: "El formato del correo electrónico no es válido." }));

export const firstNameField = z
	.string()
	.trim()
	.min(1, { error: "El nombre es obligatorio." })
	.max(50, { error: "El nombre no debe superar los 50 caracteres." })
	.regex(ONLY_LETTERS, {
		error: "El nombre solo debe contener letras y espacios.",
	})
	.transform(collapseSpaces);

export const lastNameField = z
	.string()
	.trim()
	.min(2, { error: "El apellido debe tener al menos 2 caracteres." })
	.max(50, { error: "El apellido no debe superar los 50 caracteres." })
	.regex(ONLY_LETTERS, {
		error: "El apellido solo debe contener letras y espacios.",
	})
	.transform(collapseSpaces);

export const nationalIdField = z
	.string()
	.trim()
	.min(1, { error: "La cédula de identidad es obligatoria." })
	.regex(TEN_DIGITS, {
		error: "La cédula debe tener exactamente 10 dígitos.",
	});

export const phoneField = z
	.string()
	.trim()
	.min(1, { error: "El número de teléfono es obligatorio." })
	.regex(TEN_DIGITS, {
		error: "El número de teléfono debe tener exactamente 10 dígitos.",
	});
