import type { LoginInput } from "../schemas/auth.schema";
import type { Session } from "./session.model";

export interface AuthRepository {
	getSession(): Promise<Session | null>;
	login(credentials: LoginInput): Promise<Session>;
}
