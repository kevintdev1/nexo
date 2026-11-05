import type { Option } from "@shared/types/option";
import { FormActions } from "@ui/forms/FormActions";
import { InputField } from "@ui/forms/InputField";
import { SelectField } from "@ui/forms/SelectField";
import { Modal } from "@ui/Modal";
import { INSTITUTION_STATUS_OPTIONS } from "../constants/institution-status";
import type { Institution } from "../domain/institution.model";
import { useUpdateInstitutionForm } from "../hooks/useUpdateInstitutionForm";

type UpdateInstitutionModalProps = {
	institution: Institution;
	onClose: () => void;
	cityOptions: readonly Option[];
};

export function UpdateInstitutionModal({
	institution,
	onClose,
	cityOptions,
}: UpdateInstitutionModalProps) {
	const { register, errors, isSubmitting, onSubmit } = useUpdateInstitutionForm(
		institution,
		onClose,
	);

	return (
		<Modal
			isOpen
			onClose={onClose}
			title="Editar unidad educativa"
			description="Modifica la información de la unidad educativa en el sistema."
		>
			<form onSubmit={onSubmit} noValidate className="flex flex-col">
				<InputField
					id="update-institution-name"
					label="Nombre"
					autoComplete="off"
					placeholder="U.E. Nacional Tena"
					error={errors.name?.message}
					{...register("name")}
				/>
				<SelectField
					id="update-institution-city"
					label="Ciudad"
					options={cityOptions}
					error={errors.cityId?.message}
					{...register("cityId")}
				/>
				<SelectField
					id="update-institution-status"
					label="Estado"
					options={INSTITUTION_STATUS_OPTIONS}
					error={errors.status?.message}
					{...register("status")}
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
