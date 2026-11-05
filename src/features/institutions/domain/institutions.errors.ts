export type InstitutionsErrorCode = "INSTITUTION_CITY_MISSING";

export class InstitutionsError extends Error {
	constructor(readonly code: InstitutionsErrorCode) {
		super(code);
		this.name = "InstitutionsError";
	}
}
