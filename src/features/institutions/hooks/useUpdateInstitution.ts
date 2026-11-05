import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { patchItem } from "@shared/utils/list-updates";
import { INSTITUTIONS_QUERY_KEYS } from "../constants/institutions.query-keys";
import type { Institution } from "../domain/institution.model";
import type { UpdateInstitutionInput } from "../schemas/institutions.schema";
import { useInstitutionsService } from "./useInstitutionsService";

type UpdateInstitutionVariables = {
	id: string;
	input: UpdateInstitutionInput;
};

export function useUpdateInstitution() {
	const institutionsService = useInstitutionsService();

	return useOptimisticListMutation<Institution, UpdateInstitutionVariables>({
		queryKey: INSTITUTIONS_QUERY_KEYS.list,
		mutationFn: ({ id, input }) => institutionsService.update(id, input),
		updateList: (institutions, { id, input }) =>
			patchItem(institutions, id, {
				name: input.name,
				cityId: input.cityId,
				status: input.status,
			}),
	});
}
