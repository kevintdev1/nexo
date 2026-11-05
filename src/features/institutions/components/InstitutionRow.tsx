import { TableCell, TableRow } from "@ui/Table";
import type { Institution } from "../domain/institution.model";
import type { InstitutionActions } from "../hooks/useInstitutionActions";
import { InstitutionActionsMenu } from "./InstitutionActionsMenu";
import { InstitutionStatusBadge } from "./InstitutionStatusBadge";

type InstitutionRowProps = {
	institution: Institution;
	actions: InstitutionActions;
};

export function InstitutionRow({ institution, actions }: InstitutionRowProps) {
	return (
		<TableRow>
			<TableCell>{institution.name}</TableCell>
			<TableCell>{institution.cityName}</TableCell>
			<TableCell>
				<InstitutionStatusBadge institution={institution} />
			</TableCell>
			<TableCell>
				<InstitutionActionsMenu institution={institution} actions={actions} />
			</TableCell>
		</TableRow>
	);
}
