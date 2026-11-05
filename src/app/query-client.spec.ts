import { AUTH_QUERY_KEYS } from "@features/auth/constants/auth.query-keys";
import { ApiError } from "@lib/api/api.errors";
import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import { createQueryClient } from "./query-client";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const SESSION = { menu: [] };

describe("createQueryClient", () => {
	it("ends the session without a toast when a request is unauthorized", async () => {
		const queryClient = createQueryClient();
		queryClient.setQueryData(AUTH_QUERY_KEYS.session, SESSION);

		await queryClient
			.fetchQuery({
				queryKey: ["users"],
				queryFn: () =>
					Promise.reject(new ApiError(401, "UNAUTHORIZED", "No autorizado")),
			})
			.catch(() => null);

		expect(queryClient.getQueryData(AUTH_QUERY_KEYS.session)).toBeNull();
		expect(toast.error).not.toHaveBeenCalled();
	});

	it("keeps the session and shows the error for other failures", async () => {
		const queryClient = createQueryClient();
		queryClient.setQueryData(AUTH_QUERY_KEYS.session, SESSION);

		await queryClient
			.fetchQuery({
				queryKey: ["users"],
				queryFn: () =>
					Promise.reject(new ApiError(404, "NOT_FOUND", "No existe.")),
			})
			.catch(() => null);

		expect(queryClient.getQueryData(AUTH_QUERY_KEYS.session)).toEqual(SESSION);
		expect(toast.error).toHaveBeenCalledWith("No existe.");
	});
});
