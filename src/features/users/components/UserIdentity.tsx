import { Avatar } from "@ui/Avatar";
import { getUserFullName, type User } from "../domain/user.model";

type UserIdentityProps = {
	user: Pick<User, "firstName" | "lastName" | "email" | "photoUrl">;
};

export function UserIdentity({ user }: UserIdentityProps) {
	const fullName = getUserFullName(user);

	return (
		<div className="flex items-center gap-2">
			<Avatar src={user.photoUrl} alt={`Foto de ${fullName}`} />
			<div>
				<p className="font-medium">{fullName}</p>
				<p className="text-muted-foreground text-xs">{user.email}</p>
			</div>
		</div>
	);
}
