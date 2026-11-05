import type { BadgeTone } from "@ui/Badge";
import {
	INSTITUTION_STATUSES,
	type InstitutionStatus,
} from "../domain/institution.model";

export const INSTITUTION_STATUS_LABELS: Readonly<
	Record<InstitutionStatus, string>
> = {
	affiliated: "Afiliado",
	unaffiliated: "Desafiliado",
	sanctioned: "Sancionado",
};

export const INSTITUTION_STATUS_TONES: Readonly<
	Record<InstitutionStatus, BadgeTone>
> = {
	affiliated: "success",
	unaffiliated: "warning",
	sanctioned: "danger",
};

export const INSTITUTION_STATUS_OPTIONS = INSTITUTION_STATUSES.map(
	(status) => ({
		value: status,
		label: INSTITUTION_STATUS_LABELS[status],
	}),
);
