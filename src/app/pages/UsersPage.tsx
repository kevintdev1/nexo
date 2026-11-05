import { useInstitutionOptions } from "@features/institutions/hooks/useInstitutionOptions";
import { UsersManager } from "@features/users/components/UsersManager";

export function UsersPage() {
	const institutionOptions = useInstitutionOptions();

	return <UsersManager institutionOptions={institutionOptions} />;
}
