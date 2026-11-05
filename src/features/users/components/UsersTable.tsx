import {
	Table,
	TableBody,
	type TableColumn,
	TableHeader,
	TableLoadingRow,
	TableMessageRow,
} from "@ui/Table";
import type { User } from "../domain/user.model";
import type { UserActions } from "../hooks/useUserActions";
import { UserRow } from "./UserRow";

const COLUMNS: readonly TableColumn[] = [
	{ key: "name", label: "Nombre" },
	{ key: "nationalId", label: "Cédula" },
	{ key: "role", label: "Rol" },
	{ key: "phone", label: "Celular" },
	{ key: "status", label: "Estado" },
	{ key: "actions", label: "Acciones" },
];

type UsersTableProps = {
	users: readonly User[];
	isLoading: boolean;
	emptyMessage: string;
	actions: UserActions;
};

export function UsersTable({
	users,
	isLoading,
	emptyMessage,
	actions,
}: UsersTableProps) {
	return (
		<Table>
			<TableHeader columns={COLUMNS} />
			<TableBody>
				{isLoading && <TableLoadingRow colSpan={COLUMNS.length} />}
				{!isLoading && users.length === 0 && (
					<TableMessageRow colSpan={COLUMNS.length}>
						{emptyMessage}
					</TableMessageRow>
				)}
				{!isLoading &&
					users.map((user) => (
						<UserRow key={user.id} user={user} actions={actions} />
					))}
			</TableBody>
		</Table>
	);
}
