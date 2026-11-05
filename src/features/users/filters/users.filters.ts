import { createEnumFilter } from "@shared/filters/enum.filter";
import type { Filter } from "@shared/filters/filter.types";
import { createTriStateFilter } from "@shared/filters/tri-state.filter";
import type { Option } from "@shared/types/option";
import type { User } from "../domain/user.model";

export function createUserFilters(
	roleOptions: readonly Option[],
): Filter<User>[] {
	return [
		createEnumFilter<User>({
			key: "role",
			label: "Rol",
			options: roleOptions,
			getValue: (user) => user.roleId,
		}),
		createTriStateFilter<User>({
			key: "deleted",
			label: "Usuarios eliminados",
			labels: {
				exclude: "Ocultar eliminados",
				only: "Solo eliminados",
				all: "Todos",
			},
			getValue: (user) => user.isDeleted,
		}),
	];
}

export function getUserSearchText(user: User): string {
	return `${user.firstName} ${user.lastName} ${user.nationalId ?? ""} ${user.email}`;
}
