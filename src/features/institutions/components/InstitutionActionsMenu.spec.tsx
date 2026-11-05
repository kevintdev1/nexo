import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Institution } from "../domain/institution.model";
import type { InstitutionActions } from "../hooks/useInstitutionActions";
import { InstitutionActionsMenu } from "./InstitutionActionsMenu";

const baseInstitution: Institution = {
	id: "1",
	name: "U.E. Tena",
	status: "affiliated",
	affiliatedAt: "2025-01-10",
	statusChangedAt: null,
	cityId: "10",
	cityName: "Tena",
	isDeleted: false,
};

function createActions(): InstitutionActions {
	return {
		edit: vi.fn(),
		unaffiliate: vi.fn(),
		sanction: vi.fn(),
		reaffiliate: vi.fn(),
	};
}

async function openMenu(institution: Institution, actions: InstitutionActions) {
	const user = userEvent.setup();
	render(
		<InstitutionActionsMenu institution={institution} actions={actions} />,
	);
	await user.click(
		screen.getByRole("button", { name: `Acciones para ${institution.name}` }),
	);
	return user;
}

describe("InstitutionActionsMenu", () => {
	it("offers unaffiliate and sanction for affiliated institutions", async () => {
		const actions = createActions();
		const user = await openMenu(baseInstitution, actions);

		expect(
			screen.queryByRole("menuitem", { name: "Reafiliar" }),
		).not.toBeInTheDocument();
		await user.click(screen.getByRole("menuitem", { name: "Sancionar" }));

		expect(actions.sanction).toHaveBeenCalledWith(baseInstitution);
		expect(actions.unaffiliate).not.toHaveBeenCalled();
	});

	it("offers reaffiliation for institutions that are not affiliated", async () => {
		const actions = createActions();
		const sanctioned: Institution = {
			...baseInstitution,
			status: "sanctioned",
		};
		const user = await openMenu(sanctioned, actions);

		expect(
			screen.queryByRole("menuitem", { name: "Sancionar" }),
		).not.toBeInTheDocument();
		await user.click(screen.getByRole("menuitem", { name: "Reafiliar" }));

		expect(actions.reaffiliate).toHaveBeenCalledWith(sanctioned);
		expect(actions.sanction).not.toHaveBeenCalled();
	});

	it("closes with Escape and returns focus to the trigger", async () => {
		const user = await openMenu(baseInstitution, createActions());

		await user.keyboard("{Escape}");

		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: `Acciones para ${baseInstitution.name}`,
			}),
		).toHaveFocus();
	});
});
