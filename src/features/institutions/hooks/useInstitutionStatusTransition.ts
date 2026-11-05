import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { INSTITUTION_STATUS_TRANSITIONS } from "../constants/institution-status-transitions";
import { INSTITUTIONS_ERROR_MESSAGES } from "../constants/institutions.messages";
import type {
	Institution,
	InstitutionStatus,
} from "../domain/institution.model";
import { InstitutionsError } from "../domain/institutions.errors";
import { useChangeInstitutionStatus } from "./useChangeInstitutionStatus";

const resolveErrorMessage = (error: unknown) =>
	error instanceof InstitutionsError
		? INSTITUTIONS_ERROR_MESSAGES[error.code]
		: null;

export function useInstitutionStatusTransition(status: InstitutionStatus) {
	const { mutateAsync } = useChangeInstitutionStatus();
	const transition = INSTITUTION_STATUS_TRANSITIONS[status];

	return useConfirmedMutation({
		mutate: (institution: Institution) => mutateAsync({ institution, status }),
		getConfirmation: (institution) => transition.confirmation(institution.name),
		messages: transition.messages,
		resolveErrorMessage,
	});
}
