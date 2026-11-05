import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../constants/auth.query-keys";
import { useAuthService } from "./useAuthService";

export function useSession() {
	const authService = useAuthService();
	const { data, isPending } = useQuery({
		queryKey: AUTH_QUERY_KEYS.session,
		queryFn: () => authService.getSession(),
		retry: false,
		staleTime: Number.POSITIVE_INFINITY,
		meta: { isSilent: true },
	});

	return { session: data ?? null, isLoading: isPending };
}
