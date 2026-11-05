import { cn } from "@shared/utils/cn";
import { isPendingId } from "@shared/utils/pending-id";
import { ActionsMenu } from "@ui/ActionsMenu";
import { Badge } from "@ui/Badge";
import { TableCell, TableRow } from "@ui/Table";
import { LuPencilRuler, LuTrash } from "react-icons/lu";
import { getUserFullName, type User } from "../domain/user.model";
import type { UserActions } from "../hooks/useUserActions";
import { UserIdentity } from "./UserIdentity";

const NOT_REGISTERED = "Sin registrar";

type UserRowProps = {
	user: User;
	actions: UserActions;
};

export function UserRow({ user, actions }: UserRowProps) {
	return (
		<TableRow>
			<TableCell>
				<UserIdentity user={user} />
			</TableCell>
			<TableCell className={cn(!user.nationalId && "text-muted-foreground")}>
				{user.nationalId ?? NOT_REGISTERED}
			</TableCell>
			<TableCell>
				<p>{user.roleName}</p>
				{user.institutionName && (
					<p className="text-primary-soft-foreground text-xs">
						{user.institutionName}
					</p>
				)}
			</TableCell>
			<TableCell className={cn(!user.phone && "text-muted-foreground")}>
				{user.phone ?? NOT_REGISTERED}
			</TableCell>
			<TableCell>
				{user.isDeleted ? (
					<Badge tone="danger">Eliminado</Badge>
				) : (
					<Badge tone="success">Activo</Badge>
				)}
			</TableCell>
			<TableCell>
				<ActionsMenu
					label={`Acciones para ${getUserFullName(user)}`}
					disabled={isPendingId(user.id)}
					actions={[
						{
							label: "Editar",
							icon: <LuPencilRuler aria-hidden />,
							onSelect: () => actions.edit(user),
						},
						{
							label: "Eliminar",
							icon: <LuTrash aria-hidden />,
							tone: "danger",
							onSelect: () => actions.remove(user),
						},
					]}
				/>
			</TableCell>
		</TableRow>
	);
}
