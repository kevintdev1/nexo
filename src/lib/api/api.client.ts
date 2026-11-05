import { env } from "@lib/env";
import axios, { type AxiosRequestConfig, isAxiosError } from "axios";
import { ApiError, NETWORK_ERROR_STATUS } from "./api.errors";

type ApiEnvelope<T> = {
	data: T;
};

type ApiErrorBody = {
	code?: string;
	message?: string;
	errors?: { msg?: string }[];
};

const UNKNOWN_ERROR_CODE = "UNKNOWN_ERROR";

const http = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
});

function toApiError(error: unknown): ApiError {
	if (!isAxiosError<ApiErrorBody>(error)) {
		return new ApiError(
			NETWORK_ERROR_STATUS,
			UNKNOWN_ERROR_CODE,
			"Unexpected error",
		);
	}

	const body = error.response?.data;
	return new ApiError(
		error.response?.status ?? NETWORK_ERROR_STATUS,
		body?.code ?? UNKNOWN_ERROR_CODE,
		body?.message ?? body?.errors?.[0]?.msg ?? error.message,
	);
}

async function request<T>(config: AxiosRequestConfig): Promise<T> {
	try {
		const response = await http.request<ApiEnvelope<T>>(config);
		return response.data.data;
	} catch (error) {
		throw toApiError(error);
	}
}

export const apiClient = {
	get: <T>(url: string) => request<T>({ url, method: "GET" }),
	post: <T = void>(url: string, data?: unknown) =>
		request<T>({ url, method: "POST", data }),
	put: <T = void>(url: string, data?: unknown) =>
		request<T>({ url, method: "PUT", data }),
	delete: <T = void>(url: string) => request<T>({ url, method: "DELETE" }),
};
