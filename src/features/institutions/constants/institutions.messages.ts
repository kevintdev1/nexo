import type { InstitutionsErrorCode } from "../domain/institutions.errors";

export const INSTITUTIONS_ERROR_MESSAGES: Readonly<
	Record<InstitutionsErrorCode, string>
> = {
	INSTITUTION_CITY_MISSING:
		"La unidad educativa no tiene una ciudad asignada. Edítala antes de cambiar su estado.",
};
