import { apiClient } from "@lib/api/api.client";
import type { City } from "../domain/city.model";
import {
	type Institution,
	isInstitutionStatus,
} from "../domain/institution.model";
import type { InstitutionsRepository } from "../domain/institutions.repository";
import type {
	CreateInstitutionInput,
	UpdateInstitutionInput,
} from "../schemas/institutions.schema";

type CityDto = {
	city_id: number | string;
	name: string;
};

type InstitutionDto = {
	institution_id: number | string;
	name: string;
	status: string;
	created_at: string;
	occurred_at: string | null;
	is_deleted?: boolean;
	city: CityDto | null;
};

const ENDPOINTS = {
	institutions: "institutions/",
	cities: "cities/",
	institution: (id: string) => `institutions/${id}`,
	affiliation: (id: string) => `institutions/${id}/affiliation`,
} as const;

function toCity(dto: CityDto): City {
	return { id: String(dto.city_id), name: dto.name };
}

function toInstitution(dto: InstitutionDto): Institution {
	return {
		id: String(dto.institution_id),
		name: dto.name,
		status: isInstitutionStatus(dto.status) ? dto.status : "unaffiliated",
		affiliatedAt: dto.created_at,
		statusChangedAt: dto.occurred_at,
		cityId: dto.city ? String(dto.city.city_id) : null,
		cityName: dto.city?.name ?? null,
		isDeleted: dto.is_deleted ?? false,
	};
}

export class HttpInstitutionsRepository implements InstitutionsRepository {
	async list() {
		const dtos = await apiClient.get<InstitutionDto[]>(ENDPOINTS.institutions);
		return dtos.map(toInstitution);
	}

	async listCities() {
		const dtos = await apiClient.get<CityDto[]>(ENDPOINTS.cities);
		return dtos.map(toCity);
	}

	create(input: CreateInstitutionInput) {
		return apiClient.post(ENDPOINTS.institutions, {
			name: input.name,
			city_id: input.cityId,
		});
	}

	update(id: string, input: UpdateInstitutionInput) {
		return apiClient.put(ENDPOINTS.institution(id), {
			name: input.name,
			city_id: input.cityId,
			status: input.status,
		});
	}

	unaffiliate(id: string) {
		return apiClient.delete(ENDPOINTS.affiliation(id));
	}
}
