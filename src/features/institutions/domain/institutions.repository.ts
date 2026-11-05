import type {
	CreateInstitutionInput,
	UpdateInstitutionInput,
} from "../schemas/institutions.schema";
import type { City } from "./city.model";
import type { Institution } from "./institution.model";

export interface InstitutionsRepository {
	list(): Promise<Institution[]>;
	listCities(): Promise<City[]>;
	create(input: CreateInstitutionInput): Promise<void>;
	update(id: string, input: UpdateInstitutionInput): Promise<void>;
	unaffiliate(id: string): Promise<void>;
}
