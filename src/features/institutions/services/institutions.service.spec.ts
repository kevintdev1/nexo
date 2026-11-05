import { beforeEach, describe, expect, it } from "vitest";
import type { City } from "../domain/city.model";
import type { Institution } from "../domain/institution.model";
import { InstitutionsError } from "../domain/institutions.errors";
import type { InstitutionsRepository } from "../domain/institutions.repository";
import type {
	CreateInstitutionInput,
	UpdateInstitutionInput,
} from "../schemas/institutions.schema";
import { InstitutionsService } from "./institutions.service";

class InMemoryInstitutionsRepository implements InstitutionsRepository {
	readonly updates: { id: string; input: UpdateInstitutionInput }[] = [];
	readonly unaffiliated: string[] = [];

	async list(): Promise<Institution[]> {
		return [];
	}

	async listCities(): Promise<City[]> {
		return [];
	}

	async create(_input: CreateInstitutionInput) {}

	async update(id: string, input: UpdateInstitutionInput) {
		this.updates.push({ id, input });
	}

	async unaffiliate(id: string) {
		this.unaffiliated.push(id);
	}
}

const institution = { id: "1", name: "U.E. Tena", cityId: "10" };

describe("InstitutionsService.changeStatus", () => {
	let repository: InMemoryInstitutionsRepository;
	let service: InstitutionsService;

	beforeEach(() => {
		repository = new InMemoryInstitutionsRepository();
		service = new InstitutionsService(repository);
	});

	it("uses the affiliation endpoint to unaffiliate", async () => {
		await service.changeStatus(institution, "unaffiliated");

		expect(repository.unaffiliated).toEqual(["1"]);
		expect(repository.updates).toEqual([]);
	});

	it("updates the status to sanction an institution", async () => {
		await service.changeStatus(institution, "sanctioned");

		expect(repository.updates).toEqual([
			{
				id: "1",
				input: { name: "U.E. Tena", cityId: "10", status: "sanctioned" },
			},
		]);
	});

	it("updates the status to reaffiliate an institution", async () => {
		await service.changeStatus(institution, "affiliated");

		expect(repository.updates[0]?.input.status).toBe("affiliated");
	});

	it("fails with a domain error when the institution has no city", async () => {
		await expect(
			service.changeStatus({ ...institution, cityId: null }, "sanctioned"),
		).rejects.toEqual(new InstitutionsError("INSTITUTION_CITY_MISSING"));
	});
});
