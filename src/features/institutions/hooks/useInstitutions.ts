import { useQuery } from "@tanstack/react-query";
import { INSTITUTIONS_QUERY_KEYS } from "../constants/institutions.query-keys";
import type { Institution } from "../domain/institution.model";
import { useInstitutionsService } from "./useInstitutionsService";

const NO_INSTITUTIONS: Institution[] = [];

export function useInstitutions() {
	const institutionsService = useInstitutionsService();
	const { data, isPending } = useQuery({
		queryKey: INSTITUTIONS_QUERY_KEYS.list,
		queryFn: () => institutionsService.list(),
	});

	return { institutions: data ?? NO_INSTITUTIONS, isLoading: isPending };
}
