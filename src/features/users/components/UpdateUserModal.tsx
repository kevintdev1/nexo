import { FormActions } from "@ui/forms/FormActions";
import { InputField } from "@ui/forms/InputField";
import { Modal } from "@ui/Modal";
import type { User } from "../domain/user.model";
import { useUpdateUserForm } from "../hooks/useUpdateUserForm";

type UpdateUserModalProps = {
	user: User;
	onClose: () => void;
};

export function UpdateUserModal({ user, onClose }: UpdateUserModalProps) {
	const { register, errors, isSubmitting, onSubmit } = useUpdateUserForm(
		user,
		onClose,
	);

	return (
		<Modal
			isOpen
			onClose={onClose}
			title="Editar usuario"
			description="Modifica la información del usuario en el sistema."
		>
			<form onSubmit={onSubmit} noValidate className="flex flex-col">
				<InputField
					id="update-user-national-id"
					label="Cédula de identidad"
					inputMode="numeric"
					autoComplete="off"
					placeholder="1234567890"
					error={errors.nationalId?.message}
					{...register("nationalId")}
				/>
				<InputField
					id="update-user-email"
					label="Correo electrónico"
					type="email"
					autoComplete="off"
					placeholder="nombre.apellido@gmail.com"
					error={errors.email?.message}
					{...register("email")}
				/>
				<InputField
					id="update-user-first-name"
					label="Nombre"
					autoComplete="off"
					placeholder="Kevin"
					error={errors.firstName?.message}
					{...register("firstName")}
				/>
				<InputField
					id="update-user-last-name"
					label="Apellido"
					autoComplete="off"
					placeholder="Tapia"
					error={errors.lastName?.message}
					{...register("lastName")}
				/>
				<InputField
					id="update-user-phone"
					label="Teléfono"
					type="tel"
					autoComplete="off"
					placeholder="0984735678"
					error={errors.phone?.message}
					{...register("phone")}
				/>
				<FormActions
					submitLabel="Guardar cambios"
					isSubmitting={isSubmitting}
					onCancel={onClose}
				/>
			</form>
		</Modal>
	);
}
