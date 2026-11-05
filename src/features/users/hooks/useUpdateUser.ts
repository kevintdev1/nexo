import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { patchItem } from "@shared/utils/list-updates";
import { USERS_QUERY_KEYS } from "../constants/users.query-keys";
import type { User } from "../domain/user.model";
import type { UpdateUserInput } from "../schemas/users.schema";
import { useUsersService } from "./useUsersService";

type UpdateUserVariables = {
	id: string;
	input: UpdateUserInput;
};

export function useUpdateUser() {
	const usersService = useUsersService();

	return useOptimisticListMutation<User, UpdateUserVariables>({
		queryKey: USERS_QUERY_KEYS.list,
		mutationFn: ({ id, input }) => usersService.update(id, input),
		updateList: (users, { id, input }) => patchItem(users, id, input),
	});
}
