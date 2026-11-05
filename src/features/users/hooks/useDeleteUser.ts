import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { removeItem } from "@shared/utils/list-updates";
import { USERS_QUERY_KEYS } from "../constants/users.query-keys";
import { getUserFullName, type User } from "../domain/user.model";
import { useUsersService } from "./useUsersService";

export function useDeleteUser() {
	const usersService = useUsersService();
	const { mutateAsync } = useOptimisticListMutation<User, User>({
		queryKey: USERS_QUERY_KEYS.list,
		mutationFn: (user) => usersService.remove(user.id),
		updateList: (users, user) => removeItem(users, user.id),
	});

	return useConfirmedMutation({
		mutate: mutateAsync,
		getConfirmation: (user: User) => ({
			title: "¿Eliminar usuario?",
			description: `¿Estás seguro de eliminar a ${getUserFullName(user)}?`,
			confirmLabel: "Sí, eliminar",
			tone: "danger",
		}),
		messages: {
			loading: "Eliminando usuario…",
			success: "Usuario eliminado correctamente.",
			error: "No se pudo eliminar el usuario.",
		},
	});
}
