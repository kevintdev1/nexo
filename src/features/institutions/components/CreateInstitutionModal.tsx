import type { Option } from "@shared/types/option";
import { FormActions } from "@ui/forms/FormActions";
import { InputField } from "@ui/forms/InputField";
import { SelectField } from "@ui/forms/SelectField";
import { Modal } from "@ui/Modal";
import { useCreateInstitutionForm } from "../hooks/useCreateInstitutionForm";

type CreateInstitutionModalProps = {
	isOpen: boolean;
	onClose: () => void;
	cityOptions: readonly Option[];
};

export function CreateInstitutionModal({
	isOpen,
	onClose,
	cityOptions,
}: CreateInstitutionModalProps) {
	const { register, errors, isSubmitting, onSubmit, close } =
		useCreateInstitutionForm(onClose);

	return (
		<Modal
			isOpen={isOpen}
			onClose={close}
			title="Registrar unidad educativa"
			description="Registra una unidad educativa en el sistema."
		>
			<form onSubmit={onSubmit} noValidate className="flex flex-col">
				<InputField
					id="create-institution-name"
					label="Nombre"
					autoComplete="off"
					placeholder="U.E. Nacional Tena"
					error={errors.name?.message}
					{...register("name")}
				/>
				<SelectField
					id="create-institution-city"
					label="Ciudad"
					options={cityOptions}
					error={errors.cityId?.message}
					{...register("cityId")}
				/>
				<FormActions
					submitLabel="Registrar"
					isSubmitting={isSubmitting}
					onCancel={close}
				/>
			</form>
		</Modal>
	);
}
