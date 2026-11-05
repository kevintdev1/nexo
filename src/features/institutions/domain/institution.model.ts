export const INSTITUTION_STATUSES = [
	"affiliated",
	"unaffiliated",
	"sanctioned",
] as const;

export type InstitutionStatus = (typeof INSTITUTION_STATUSES)[number];

export type Institution = {
	id: string;
	name: string;
	status: InstitutionStatus;
	affiliatedAt: string;
	statusChangedAt: string | null;
	cityId: string | null;
	cityName: string | null;
	isDeleted: boolean;
};

export function isInstitutionStatus(value: string): value is InstitutionStatus {
	return INSTITUTION_STATUSES.some((status) => status === value);
}

export function isAffiliated(
	institution: Pick<Institution, "status">,
): boolean {
	return institution.status === "affiliated";
}
