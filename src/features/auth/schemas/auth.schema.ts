import { emailField } from "@shared/validations/person.fields";
import { z } from "zod";

export const loginSchema = z.object({
	email: emailField,
	password: z.string().min(1, { error: "La contraseña es obligatoria." }),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginInput = z.output<typeof loginSchema>;
