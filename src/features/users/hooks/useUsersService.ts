import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { UsersServiceContext } from "../services/users.context";

export function useUsersService() {
	return useRequiredContext(UsersServiceContext, "useUsersService");
}
