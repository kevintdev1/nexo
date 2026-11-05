import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { InstitutionsServiceContext } from "../services/institutions.context";

export function useInstitutionsService() {
	return useRequiredContext(
		InstitutionsServiceContext,
		"useInstitutionsService",
	);
}
