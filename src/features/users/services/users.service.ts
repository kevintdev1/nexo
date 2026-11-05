import type { Role } from "../domain/role.model";
import type { User } from "../domain/user.model";
import type { UsersRepository } from "../domain/users.repository";
import type { InviteUserInput, UpdateUserInput } from "../schemas/users.schema";

export class UsersService {
	constructor(private readonly repository: UsersRepository) {}

	list(): Promise<User[]> {
		return this.repository.list();
	}

	listRoles(): Promise<Role[]> {
		return this.repository.listRoles();
	}

	invite(input: InviteUserInput): Promise<void> {
		return this.repository.invite(input);
	}

	update(id: string, input: UpdateUserInput): Promise<void> {
		return this.repository.update(id, input);
	}

	remove(id: string): Promise<void> {
		return this.repository.remove(id);
	}
}
