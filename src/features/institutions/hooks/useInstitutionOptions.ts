import { useMemo } from "react";
import { useInstitutions } from "./useInstitutions";

export function useInstitutionOptions() {
	const { institutions } = useInstitutions();

	return useMemo(
		() =>
			institutions
				.filter((institution) => !institution.isDeleted)
				.map((institution) => ({
					value: institution.id,
					label: institution.name,
				})),
		[institutions],
	);
}
