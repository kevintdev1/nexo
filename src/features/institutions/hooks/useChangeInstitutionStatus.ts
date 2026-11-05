import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { patchItem } from "@shared/utils/list-updates";
import { INSTITUTIONS_QUERY_KEYS } from "../constants/institutions.query-keys";
import type {
	Institution,
	InstitutionStatus,
} from "../domain/institution.model";
import { useInstitutionsService } from "./useInstitutionsService";

export type ChangeInstitutionStatusVariables = {
	institution: Institution;
	status: InstitutionStatus;
};

export function useChangeInstitutionStatus() {
	const institutionsService = useInstitutionsService();

	return useOptimisticListMutation<
		Institution,
		ChangeInstitutionStatusVariables
	>({
		queryKey: INSTITUTIONS_QUERY_KEYS.list,
		mutationFn: ({ institution, status }) =>
			institutionsService.changeStatus(institution, status),
		updateList: (institutions, { institution, status }) =>
			patchItem(institutions, institution.id, { status }),
	});
}
