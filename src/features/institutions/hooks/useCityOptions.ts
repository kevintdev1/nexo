import { CATALOG_STALE_TIME_MS } from "@shared/constants/query";
import type { Option } from "@shared/types/option";
import { useQuery } from "@tanstack/react-query";
import { INSTITUTIONS_QUERY_KEYS } from "../constants/institutions.query-keys";
import type { City } from "../domain/city.model";
import { useInstitutionsService } from "./useInstitutionsService";

const NO_OPTIONS: Option[] = [];

const toOptions = (cities: City[]): Option[] =>
	cities.map((city) => ({ value: city.id, label: city.name }));

export function useCityOptions() {
	const institutionsService = useInstitutionsService();
	const { data, isPending } = useQuery({
		queryKey: INSTITUTIONS_QUERY_KEYS.cities,
		queryFn: () => institutionsService.listCities(),
		staleTime: CATALOG_STALE_TIME_MS,
		select: toOptions,
	});

	return { cityOptions: data ?? NO_OPTIONS, isLoading: isPending };
}
