import { AUTH_QUERY_KEYS } from "@features/auth/constants/auth.query-keys";
import { ApiError } from "@lib/api/api.errors";
import { DEFAULT_STALE_TIME_MS } from "@shared/constants/query";
import { getErrorMessage } from "@shared/utils/get-error-message";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MAX_RETRIES = 2;
const UNAUTHORIZED_STATUS = 401;

function isClientError(error: unknown): boolean {
	return error instanceof ApiError && error.status >= 400 && error.status < 500;
}

function isUnauthorized(error: unknown): boolean {
	return error instanceof ApiError && error.status === UNAUTHORIZED_STATUS;
}

function shouldRetry(failureCount: number, error: unknown): boolean {
	return !isClientError(error) && failureCount < MAX_RETRIES;
}

export function createQueryClient() {
	const endSessionOnUnauthorized = (error: unknown) => {
		if (!isUnauthorized(error)) return false;
		queryClient.setQueryData(AUTH_QUERY_KEYS.session, null);
		return true;
	};

	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error, query) => {
				if (endSessionOnUnauthorized(error) || query.meta?.isSilent) return;
				toast.error(
					getErrorMessage(error, "No se pudo cargar la información."),
				);
			},
		}),
		mutationCache: new MutationCache({
			onError: endSessionOnUnauthorized,
		}),
		defaultOptions: {
			queries: {
				staleTime: DEFAULT_STALE_TIME_MS,
				retry: shouldRetry,
			},
		},
	});

	return queryClient;
}
