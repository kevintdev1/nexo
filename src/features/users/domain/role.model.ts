export type Role = {
	id: string;
	name: string;
};

const INSTITUTION_REPRESENTATIVE_ROLE_NAME = "Representante educativo";

export function requiresInstitution(role: Pick<Role, "name">): boolean {
	return role.name === INSTITUTION_REPRESENTATIVE_ROLE_NAME;
}
