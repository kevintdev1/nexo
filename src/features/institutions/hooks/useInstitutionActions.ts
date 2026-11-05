import type { Institution } from "../domain/institution.model";
import { useInstitutionStatusTransition } from "./useInstitutionStatusTransition";

export type InstitutionActions = {
	edit: (institution: Institution) => void;
	unaffiliate: (institution: Institution) => void;
	sanction: (institution: Institution) => void;
	reaffiliate: (institution: Institution) => void;
};

export function useInstitutionActions(
	edit: (institution: Institution) => void,
): InstitutionActions {
	const unaffiliate = useInstitutionStatusTransition("unaffiliated");
	const sanction = useInstitutionStatusTransition("sanctioned");
	const reaffiliate = useInstitutionStatusTransition("affiliated");

	return { edit, unaffiliate, sanction, reaffiliate };
}
