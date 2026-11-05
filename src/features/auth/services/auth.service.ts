import type { AuthRepository } from "../domain/auth.repository";
import type { Session } from "../domain/session.model";
import type { LoginInput } from "../schemas/auth.schema";

export class AuthService {
	constructor(private readonly repository: AuthRepository) {}

	getSession(): Promise<Session | null> {
		return this.repository.getSession();
	}

	login(credentials: LoginInput): Promise<Session> {
		return this.repository.login(credentials);
	}
}
