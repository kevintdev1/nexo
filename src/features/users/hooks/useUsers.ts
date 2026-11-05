import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from "../constants/users.query-keys";
import type { User } from "../domain/user.model";
import { useUsersService } from "./useUsersService";

const NO_USERS: User[] = [];

export function useUsers() {
	const usersService = useUsersService();
	const { data, isPending } = useQuery({
		queryKey: USERS_QUERY_KEYS.list,
		queryFn: () => usersService.list(),
	});

	return { users: data ?? NO_USERS, isLoading: isPending };
}
