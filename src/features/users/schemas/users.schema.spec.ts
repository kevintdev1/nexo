import { describe, expect, it } from "vitest";
import { createInviteUserSchema, updateUserSchema } from "./users.schema";

const REPRESENTATIVE_ROLE_ID = "2";
const schema = createInviteUserSchema([REPRESENTATIVE_ROLE_ID]);

const invitation = {
	email: "ana@example.com",
	firstName: "Ana",
	lastName: "Pérez",
	roleId: "1",
	institutionId: "",
};

describe("createInviteUserSchema", () => {
	it("drops the institution for roles that do not need one", () => {
		const result = schema.parse({ ...invitation, institutionId: "7" });
		expect(result.institutionId).toBeNull();
	});

	it("requires an institution for representative roles", () => {
		const result = schema.safeParse({
			...invitation,
			roleId: REPRESENTATIVE_ROLE_ID,
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues[0]).toMatchObject({
			path: ["institutionId"],
			message: "Debes seleccionar una unidad educativa.",
		});
	});

	it("keeps the institution for representative roles", () => {
		const result = schema.parse({
			...invitation,
			roleId: REPRESENTATIVE_ROLE_ID,
			institutionId: "7",
		});
		expect(result.institutionId).toBe("7");
	});
});

describe("updateUserSchema", () => {
	const changes = {
		nationalId: "",
		email: "ana@example.com",
		firstName: "Ana",
		lastName: "Pérez",
		phone: "  ",
	};

	it("turns empty optional fields into null", () => {
		expect(updateUserSchema.parse(changes)).toMatchObject({
			nationalId: null,
			phone: null,
		});
	});

	it("validates optional fields when they are filled", () => {
		const result = updateUserSchema.safeParse({ ...changes, phone: "123" });
		expect(result.error?.issues[0]).toMatchObject({
			path: ["phone"],
			message: "El número de teléfono debe tener exactamente 10 dígitos.",
		});
	});
});
