import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { studentSchema } from "./students.schema";

const student = {
	photo: undefined,
	nationalId: "1500000001",
	firstName: "Juan",
	lastName: "Pérez",
	dateOfBirth: "2005-03-15",
	bloodType: "O+",
	gender: "M",
	enrolmentNumber: "STU-2024-001",
};

async function toFileList(file: File): Promise<FileList> {
	const input = document.createElement("input");
	input.type = "file";
	document.body.append(input);
	await userEvent.upload(input, file);
	input.remove();
	if (!input.files) throw new Error("The file input did not receive files");
	return input.files;
}

describe("studentSchema", () => {
	it("accepts a student without a photo", () => {
		expect(studentSchema.parse(student).photo).toBeUndefined();
	});

	it("requires a blood type to be selected", () => {
		const result = studentSchema.safeParse({ ...student, bloodType: "" });
		expect(result.error?.issues[0]?.message).toBe(
			"Debes seleccionar una opción.",
		);
	});

	it("rejects a birth date in the future", () => {
		const result = studentSchema.safeParse({
			...student,
			dateOfBirth: "2999-01-01",
		});
		expect(result.error?.issues[0]?.message).toBe(
			"La fecha de nacimiento no puede ser futura.",
		);
	});

	it("rejects an unknown gender", () => {
		const result = studentSchema.safeParse({ ...student, gender: "X" });
		expect(result.error?.issues[0]?.message).toBe(
			"Selecciona una opción válida.",
		);
	});

	it("extracts the selected image from the file list", async () => {
		const photo = new File(["img"], "photo.png", { type: "image/png" });
		const files = await toFileList(photo);
		expect(studentSchema.parse({ ...student, photo: files }).photo).toBe(photo);
	});

	it("rejects files that are not images", async () => {
		const pdf = new File(["pdf"], "cv.pdf", { type: "application/pdf" });
		const files = await toFileList(pdf);
		const result = studentSchema.safeParse({ ...student, photo: files });
		expect(result.error?.issues[0]?.message).toBe(
			"La foto debe ser una imagen.",
		);
	});
});
