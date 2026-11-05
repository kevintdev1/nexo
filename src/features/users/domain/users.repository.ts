import type { InviteUserInput, UpdateUserInput } from "../schemas/users.schema";
import type { Role } from "./role.model";
import type { User } from "./user.model";

export interface UsersRepository {
	list(): Promise<User[]>;
	listRoles(): Promise<Role[]>;
	invite(input: InviteUserInput): Promise<void>;
	update(id: string, input: UpdateUserInput): Promise<void>;
	remove(id: string): Promise<void>;
}
