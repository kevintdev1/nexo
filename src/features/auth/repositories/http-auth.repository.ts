import { apiClient } from "@lib/api/api.client";
import { ApiError } from "@lib/api/api.errors";
import type { AuthRepository } from "../domain/auth.repository";
import type { MenuEntry, Session } from "../domain/session.model";
import type { LoginInput } from "../schemas/auth.schema";

type MenuEntryDto = {
	name: string;
	path?: string | null;
	children?: MenuEntryDto[];
};

type SessionDto = {
	session?: {
		menu?: MenuEntryDto[];
	};
};

const ENDPOINTS = {
	session: "auth/me/session",
	login: "auth/login",
} as const;

const UNAUTHENTICATED_STATUS = 401;

function toMenuEntry(dto: MenuEntryDto): MenuEntry {
	return {
		name: dto.name,
		path: dto.path ?? null,
		children: (dto.children ?? []).map(toMenuEntry),
	};
}

function toSession(dto: SessionDto): Session {
	return { menu: (dto.session?.menu ?? []).map(toMenuEntry) };
}

export class HttpAuthRepository implements AuthRepository {
	async getSession() {
		try {
			return toSession(await apiClient.get<SessionDto>(ENDPOINTS.session));
		} catch (error) {
			if (
				error instanceof ApiError &&
				error.status === UNAUTHENTICATED_STATUS
			) {
				return null;
			}
			throw error;
		}
	}

	async login(credentials: LoginInput) {
		return toSession(
			await apiClient.post<SessionDto>(ENDPOINTS.login, credentials),
		);
	}
}
