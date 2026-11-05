import {
	Table,
	TableBody,
	type TableColumn,
	TableHeader,
	TableLoadingRow,
	TableMessageRow,
} from "@ui/Table";
import type { Institution } from "../domain/institution.model";
import type { InstitutionActions } from "../hooks/useInstitutionActions";
import { InstitutionRow } from "./InstitutionRow";

const COLUMNS: readonly TableColumn[] = [
	{ key: "name", label: "Nombre" },
	{ key: "city", label: "Ciudad" },
	{ key: "status", label: "Estado" },
	{ key: "actions", label: "Acciones" },
];

type InstitutionsTableProps = {
	institutions: readonly Institution[];
	isLoading: boolean;
	emptyMessage: string;
	actions: InstitutionActions;
};

export function InstitutionsTable({
	institutions,
	isLoading,
	emptyMessage,
	actions,
}: InstitutionsTableProps) {
	return (
		<Table>
			<TableHeader columns={COLUMNS} />
			<TableBody>
				{isLoading && <TableLoadingRow colSpan={COLUMNS.length} />}
				{!isLoading && institutions.length === 0 && (
					<TableMessageRow colSpan={COLUMNS.length}>
						{emptyMessage}
					</TableMessageRow>
				)}
				{!isLoading &&
					institutions.map((institution) => (
						<InstitutionRow
							key={institution.id}
							institution={institution}
							actions={actions}
						/>
					))}
			</TableBody>
		</Table>
	);
}
