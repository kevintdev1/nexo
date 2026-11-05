import { createEnumFilter } from "@shared/filters/enum.filter";
import type { Filter } from "@shared/filters/filter.types";
import { createTriStateFilter } from "@shared/filters/tri-state.filter";
import type { Option } from "@shared/types/option";
import { INSTITUTION_STATUS_OPTIONS } from "../constants/institution-status";
import type { Institution } from "../domain/institution.model";

export function createInstitutionFilters(
	cityOptions: readonly Option[],
): Filter<Institution>[] {
	return [
		createEnumFilter<Institution>({
			key: "city",
			label: "Ciudad",
			options: cityOptions,
			getValue: (institution) => institution.cityId,
		}),
		createEnumFilter<Institution>({
			key: "status",
			label: "Estado",
			options: INSTITUTION_STATUS_OPTIONS,
			getValue: (institution) => institution.status,
		}),
		createTriStateFilter<Institution>({
			key: "deleted",
			label: "Instituciones eliminadas",
			labels: {
				exclude: "Ocultar eliminadas",
				only: "Solo eliminadas",
				all: "Todas",
			},
			getValue: (institution) => institution.isDeleted,
		}),
	];
}

export function getInstitutionSearchText(institution: Institution): string {
	return `${institution.name} ${institution.cityName ?? ""}`;
}
