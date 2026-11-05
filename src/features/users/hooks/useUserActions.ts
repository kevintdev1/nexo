import type { User } from "../domain/user.model";
import { useDeleteUser } from "./useDeleteUser";

export type UserActions = {
	edit: (user: User) => void;
	remove: (user: User) => void;
};

export function useUserActions(edit: (user: User) => void): UserActions {
	const remove = useDeleteUser();

	return { edit, remove };
}
