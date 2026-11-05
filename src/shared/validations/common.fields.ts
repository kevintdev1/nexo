import { z } from "zod";

const REPEATED_SPACES = /\s+/g;

export const collapseSpaces = (value: string) =>
	value.replace(REPEATED_SPACES, " ").trim();

export const requiredSelectField = z
	.string()
	.min(1, { error: "Debes seleccionar una opción." });

export function optionalField(field: z.ZodType<string, string>) {
	return z.string().transform((value, context) => {
		const trimmed = value.trim();
		if (!trimmed) return null;

		const result = field.safeParse(trimmed);
		if (result.success) return result.data;

		for (const issue of result.error.issues) {
			context.addIssue({ code: "custom", message: issue.message });
		}
		return z.NEVER;
	});
}
