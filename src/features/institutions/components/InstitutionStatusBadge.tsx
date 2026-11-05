import { formatLongDate } from "@shared/utils/format-date";
import { Badge } from "@ui/Badge";
import {
	INSTITUTION_STATUS_LABELS,
	INSTITUTION_STATUS_TONES,
} from "../constants/institution-status";
import type { Institution } from "../domain/institution.model";

type InstitutionStatusBadgeProps = {
	institution: Pick<Institution, "status" | "affiliatedAt" | "statusChangedAt">;
};

export function InstitutionStatusBadge({
	institution,
}: InstitutionStatusBadgeProps) {
	const date = formatLongDate(
		institution.statusChangedAt ?? institution.affiliatedAt,
	);
	const label = INSTITUTION_STATUS_LABELS[institution.status];

	return (
		<Badge tone={INSTITUTION_STATUS_TONES[institution.status]}>
			{date ? `${label} el ${date}` : label}
		</Badge>
	);
}
