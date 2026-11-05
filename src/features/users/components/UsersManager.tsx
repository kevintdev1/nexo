import { FilterMenu } from "@shared/components/FilterMenu";
import { useDisclosure } from "@shared/hooks/useDisclosure";
import { useListView } from "@shared/hooks/useListView";
import { useSelection } from "@shared/hooks/useSelection";
import type { Option } from "@shared/types/option";
import { ContentCard } from "@ui/ContentCard";
import { CreateButton } from "@ui/CreateButton";
import { SearchField } from "@ui/forms/SearchField";
import { Toolbar } from "@ui/Toolbar";
import { useMemo } from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import type { User } from "../domain/user.model";
import { createUserFilters, getUserSearchText } from "../filters/users.filters";
import { useRoles } from "../hooks/useRoles";
import { useUserActions } from "../hooks/useUserActions";
import { useUsers } from "../hooks/useUsers";
import { InviteUserModal } from "./InviteUserModal";
import { UpdateUserModal } from "./UpdateUserModal";
import { UsersTable } from "./UsersTable";

type UsersManagerProps = {
	institutionOptions: readonly Option[];
};

export function UsersManager({ institutionOptions }: UsersManagerProps) {
	const { users, isLoading } = useUsers();
	const { roles, roleOptions } = useRoles();
	const filters = useMemo(() => createUserFilters(roleOptions), [roleOptions]);
	const { results, search, filterMenu } = useListView(
		users,
		filters,
		getUserSearchText,
	);
	const inviteDialog = useDisclosure();
	const editing = useSelection<User>();
	const actions = useUserActions(editing.select);

	return (
		<>
			<ContentCard
				header={
					<Toolbar>
						<SearchField
							id="users-search"
							label="Buscar usuario"
							placeholder="Buscar por nombre, cédula o email"
							{...search}
						/>
						<FilterMenu {...filterMenu} />
						<CreateButton
							label="Invitar usuario"
							icon={<LuUserRoundPlus aria-hidden />}
							onClick={inviteDialog.open}
						/>
					</Toolbar>
				}
			>
				<UsersTable
					users={results}
					isLoading={isLoading}
					emptyMessage={
						users.length === 0
							? "No hay usuarios registrados."
							: "Ningún usuario coincide con la búsqueda."
					}
					actions={actions}
				/>
			</ContentCard>

			<InviteUserModal
				isOpen={inviteDialog.isOpen}
				onClose={inviteDialog.close}
				roles={roles}
				roleOptions={roleOptions}
				institutionOptions={institutionOptions}
			/>

			{editing.selected && (
				<UpdateUserModal
					key={editing.selected.id}
					user={editing.selected}
					onClose={editing.clear}
				/>
			)}
		</>
	);
}
