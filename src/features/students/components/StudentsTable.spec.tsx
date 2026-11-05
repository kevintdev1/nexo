import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Student } from "../domain/student.model";
import { StudentsTable } from "./StudentsTable";

const student: Student = {
	id: "1",
	nationalId: "1500000001",
	firstName: "María",
	lastName: "Gómez",
	photoUrl: null,
	dateOfBirth: "2006-07-20",
	bloodType: "A+",
	gender: "F",
	enrolmentNumber: "STU-2023-002",
	isDeleted: false,
};

const actions = { edit: vi.fn(), remove: vi.fn() };

describe("StudentsTable", () => {
	it("renders one row per student with its details", () => {
		render(
			<StudentsTable
				students={[student]}
				isLoading={false}
				emptyMessage="Vacío"
				actions={actions}
			/>,
		);

		const row = screen.getByRole("row", { name: /María Gómez/ });
		expect(within(row).getByText("STU-2023-002")).toBeInTheDocument();
		expect(within(row).getByText("Femenino")).toBeInTheDocument();
		expect(within(row).getByText("A+")).toBeInTheDocument();
	});

	it("shows the empty message when there are no students", () => {
		render(
			<StudentsTable
				students={[]}
				isLoading={false}
				emptyMessage="Vacío"
				actions={actions}
			/>,
		);

		expect(screen.getByText("Vacío")).toBeInTheDocument();
	});

	it("shows a loader while loading", () => {
		render(
			<StudentsTable
				students={[student]}
				isLoading
				emptyMessage="Vacío"
				actions={actions}
			/>,
		);

		expect(
			screen.getByRole("status", { name: "Cargando" }),
		).toBeInTheDocument();
		expect(screen.queryByText("María Gómez")).not.toBeInTheDocument();
	});
});
