import { apiClient } from "@lib/api/api.client";
import type { Role } from "../domain/role.model";
import type { User } from "../domain/user.model";
import type { UsersRepository } from "../domain/users.repository";
import type { InviteUserInput, UpdateUserInput } from "../schemas/users.schema";

type RoleDto = {
	role_id: number | string;
	name: string;
};

type UserDto = {
	person_id: number | string;
	national_id_number: string | null;
	first_name: string;
	last_name: string;
	photo_url: string | null;
	email: string;
	phone_number: string | null;
	is_deleted: boolean;
	role: (RoleDto & { institution?: { name: string } | null }) | null;
};

const ENDPOINTS = {
	users: "users/",
	roles: "auth/roles/",
	invitation: "users/invitation/",
	user: (id: string) => `users/${id}`,
} as const;

function toRole(dto: RoleDto): Role {
	return { id: String(dto.role_id), name: dto.name };
}

function toUser(dto: UserDto): User {
	return {
		id: String(dto.person_id),
		nationalId: dto.national_id_number,
		firstName: dto.first_name,
		lastName: dto.last_name,
		photoUrl: dto.photo_url,
		email: dto.email,
		phone: dto.phone_number,
		roleId: dto.role ? String(dto.role.role_id) : null,
		roleName: dto.role?.name ?? null,
		institutionName: dto.role?.institution?.name ?? null,
		isDeleted: dto.is_deleted,
	};
}

export class HttpUsersRepository implements UsersRepository {
	async list() {
		const dtos = await apiClient.get<UserDto[]>(ENDPOINTS.users);
		return dtos.map(toUser);
	}

	async listRoles() {
		const dtos = await apiClient.get<RoleDto[]>(ENDPOINTS.roles);
		return dtos.map(toRole);
	}

	invite(input: InviteUserInput) {
		return apiClient.post(ENDPOINTS.invitation, {
			email: input.email,
			first_name: input.firstName,
			last_name: input.lastName,
			role_id: input.roleId,
			...(input.institutionId && { institution_id: input.institutionId }),
		});
	}

	update(id: string, input: UpdateUserInput) {
		return apiClient.put(ENDPOINTS.user(id), {
			national_id_number: input.nationalId,
			email: input.email,
			first_name: input.firstName,
			last_name: input.lastName,
			phone_number: input.phone,
		});
	}

	remove(id: string) {
		return apiClient.delete(ENDPOINTS.user(id));
	}
}
