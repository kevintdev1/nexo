import type { City } from "../domain/city.model";
import type {
	Institution,
	InstitutionStatus,
} from "../domain/institution.model";
import { InstitutionsError } from "../domain/institutions.errors";
import type { InstitutionsRepository } from "../domain/institutions.repository";
import type {
	CreateInstitutionInput,
	UpdateInstitutionInput,
} from "../schemas/institutions.schema";

export class InstitutionsService {
	constructor(private readonly repository: InstitutionsRepository) {}

	list(): Promise<Institution[]> {
		return this.repository.list();
	}

	listCities(): Promise<City[]> {
		return this.repository.listCities();
	}

	create(input: CreateInstitutionInput): Promise<void> {
		return this.repository.create(input);
	}

	update(id: string, input: UpdateInstitutionInput): Promise<void> {
		return this.repository.update(id, input);
	}

	async changeStatus(
		institution: Pick<Institution, "id" | "name" | "cityId">,
		status: InstitutionStatus,
	): Promise<void> {
		if (status === "unaffiliated")
			return this.repository.unaffiliate(institution.id);
		if (!institution.cityId)
			throw new InstitutionsError("INSTITUTION_CITY_MISSING");

		await this.repository.update(institution.id, {
			name: institution.name,
			cityId: institution.cityId,
			status,
		});
	}
}
