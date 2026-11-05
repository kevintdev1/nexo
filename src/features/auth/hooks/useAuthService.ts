import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { AuthServiceContext } from "../services/auth.context";

export function useAuthService() {
	return useRequiredContext(AuthServiceContext, "useAuthService");
}
