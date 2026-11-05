export type User = {
	id: string;
	nationalId: string | null;
	firstName: string;
	lastName: string;
	photoUrl: string | null;
	email: string;
	phone: string | null;
	roleId: string | null;
	roleName: string | null;
	institutionName: string | null;
	isDeleted: boolean;
};

export function getUserFullName(
	user: Pick<User, "firstName" | "lastName">,
): string {
	return `${user.firstName} ${user.lastName}`;
}
