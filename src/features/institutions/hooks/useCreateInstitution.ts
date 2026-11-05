import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { toIsoDate } from "@shared/utils/format-date";
import { appendItem } from "@shared/utils/list-updates";
import { createPendingId } from "@shared/utils/pending-id";
import { INSTITUTIONS_QUERY_KEYS } from "../constants/institutions.query-keys";
import type { Institution } from "../domain/institution.model";
import type { CreateInstitutionInput } from "../schemas/institutions.schema";
import { useInstitutionsService } from "./useInstitutionsService";

function toPendingInstitution(input: CreateInstitutionInput): Institution {
	return {
		id: createPendingId(),
		name: input.name,
		status: "affiliated",
		affiliatedAt: toIsoDate(new Date()),
		statusChangedAt: null,
		cityId: input.cityId,
		cityName: null,
		isDeleted: false,
	};
}

export function useCreateInstitution() {
	const institutionsService = useInstitutionsService();

	return useOptimisticListMutation<Institution, CreateInstitutionInput>({
		queryKey: INSTITUTIONS_QUERY_KEYS.list,
		mutationFn: (input) => institutionsService.create(input),
		updateList: (institutions, input) =>
			appendItem(institutions, toPendingInstitution(input)),
	});
}
