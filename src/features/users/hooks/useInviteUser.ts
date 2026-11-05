import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { appendItem } from "@shared/utils/list-updates";
import { createPendingId } from "@shared/utils/pending-id";
import { USERS_QUERY_KEYS } from "../constants/users.query-keys";
import type { User } from "../domain/user.model";
import type { InviteUserInput } from "../schemas/users.schema";
import { useUsersService } from "./useUsersService";

function toPendingUser(input: InviteUserInput): User {
	return {
		id: createPendingId(),
		nationalId: null,
		firstName: input.firstName,
		lastName: input.lastName,
		photoUrl: null,
		email: input.email,
		phone: null,
		roleId: input.roleId,
		roleName: null,
		institutionName: null,
		isDeleted: false,
	};
}

export function useInviteUser() {
	const usersService = useUsersService();

	return useOptimisticListMutation<User, InviteUserInput>({
		queryKey: USERS_QUERY_KEYS.list,
		mutationFn: (input) => usersService.invite(input),
		updateList: (users, input) => appendItem(users, toPendingUser(input)),
	});
}
