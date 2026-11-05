import { describe, expect, it } from "vitest";
import { emailField, firstNameField, nationalIdField } from "./person.fields";

const firstError = (result: {
	success: boolean;
	error?: { issues: { message: string }[] };
}) => result.error?.issues[0]?.message;

describe("emailField", () => {
	it("trims a valid email", () => {
		expect(emailField.parse("  ana@example.com ")).toBe("ana@example.com");
	});

	it("requires a value", () => {
		expect(firstError(emailField.safeParse(""))).toBe(
			"El correo es un campo obligatorio.",
		);
	});

	it("rejects an invalid format", () => {
		expect(firstError(emailField.safeParse("ana@"))).toBe(
			"El formato del correo electrónico no es válido.",
		);
	});
});

describe("firstNameField", () => {
	it("collapses repeated spaces", () => {
		expect(firstNameField.parse("Ana   María")).toBe("Ana María");
	});

	it("rejects digits", () => {
		expect(firstError(firstNameField.safeParse("Ana1"))).toBe(
			"El nombre solo debe contener letras y espacios.",
		);
	});
});

describe("nationalIdField", () => {
	it("accepts exactly ten digits", () => {
		expect(nationalIdField.parse("1500000001")).toBe("1500000001");
	});

	it("rejects other lengths", () => {
		expect(firstError(nationalIdField.safeParse("123"))).toBe(
			"La cédula debe tener exactamente 10 dígitos.",
		);
	});
});
