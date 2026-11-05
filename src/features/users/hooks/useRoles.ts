import { CATALOG_STALE_TIME_MS } from "@shared/constants/query";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { USERS_QUERY_KEYS } from "../constants/users.query-keys";
import type { Role } from "../domain/role.model";
import { useUsersService } from "./useUsersService";

const NO_ROLES: Role[] = [];

export function useRoles() {
	const usersService = useUsersService();
	const { data, isPending } = useQuery({
		queryKey: USERS_QUERY_KEYS.roles,
		queryFn: () => usersService.listRoles(),
		staleTime: CATALOG_STALE_TIME_MS,
	});
	const roles = data ?? NO_ROLES;

	const roleOptions = useMemo(
		() => roles.map((role) => ({ value: role.id, label: role.name })),
		[roles],
	);

	return { roles, roleOptions, isLoading: isPending };
}
