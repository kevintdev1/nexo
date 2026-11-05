import { ApiError, NETWORK_ERROR_STATUS } from "@lib/api/api.errors";

export function getErrorMessage(error: unknown, fallback: string): string {
	if (!(error instanceof ApiError)) return fallback;
	if (error.status === NETWORK_ERROR_STATUS) return fallback;
	return error.message || fallback;
}
