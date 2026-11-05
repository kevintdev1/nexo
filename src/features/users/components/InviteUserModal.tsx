import type { Option } from "@shared/types/option";
import { FormActions } from "@ui/forms/FormActions";
import { InputField } from "@ui/forms/InputField";
import { SelectField } from "@ui/forms/SelectField";
import { Modal } from "@ui/Modal";
import type { Role } from "../domain/role.model";
import { useInviteUserForm } from "../hooks/useInviteUserForm";

type InviteUserModalProps = {
	isOpen: boolean;
	onClose: () => void;
	roles: readonly Role[];
	roleOptions: readonly Option[];
	institutionOptions: readonly Option[];
};

export function InviteUserModal({
	isOpen,
	onClose,
	roles,
	roleOptions,
	institutionOptions,
}: InviteUserModalProps) {
	const {
		register,
		errors,
		isSubmitting,
		isInstitutionRequired,
		onSubmit,
		close,
	} = useInviteUserForm(roles, onClose);

	return (
		<Modal
			isOpen={isOpen}
			onClose={close}
			title="Enviar invitación"
			description="Envía una invitación por email para que el usuario se registre en el sistema."
		>
			<form onSubmit={onSubmit} noValidate className="flex flex-col">
				<InputField
					id="invite-user-email"
					label="Correo electrónico"
					type="email"
					autoComplete="off"
					placeholder="nombre.apellido@gmail.com"
					error={errors.email?.message}
					{...register("email")}
				/>
				<InputField
					id="invite-user-first-name"
					label="Nombre"
					autoComplete="off"
					placeholder="Kevin"
					error={errors.firstName?.message}
					{...register("firstName")}
				/>
				<InputField
					id="invite-user-last-name"
					label="Apellido"
					autoComplete="off"
					placeholder="Tapia"
					error={errors.lastName?.message}
					{...register("lastName")}
				/>
				<SelectField
					id="invite-user-role"
					label="Rol"
					options={roleOptions}
					error={errors.roleId?.message}
					{...register("roleId")}
				/>
				{isInstitutionRequired && (
					<SelectField
						id="invite-user-institution"
						label="Unidad educativa"
						options={institutionOptions}
						error={errors.institutionId?.message}
						{...register("institutionId")}
					/>
				)}
				<FormActions
					submitLabel="Enviar"
					isSubmitting={isSubmitting}
					onCancel={close}
				/>
			</form>
		</Modal>
	);
}
