import { FormActions } from "@ui/forms/FormActions";
import { InputField } from "@ui/forms/InputField";
import { SelectField } from "@ui/forms/SelectField";
import { useId } from "react";
import {
	BLOOD_TYPE_OPTIONS,
	GENDER_OPTIONS,
} from "../constants/student-options";
import type { StudentFormController } from "../hooks/useStudentForm";

type StudentFormProps = {
	controller: StudentFormController;
	submitLabel: string;
};

export function StudentForm({ controller, submitLabel }: StudentFormProps) {
	const { register, errors, isSubmitting, onSubmit, close } = controller;
	const formId = useId();

	return (
		<form onSubmit={onSubmit} noValidate className="flex flex-col">
			<InputField
				id={`${formId}-photo`}
				label="Foto (opcional)"
				type="file"
				accept="image/*"
				error={errors.photo?.message}
				{...register("photo")}
			/>
			<InputField
				id={`${formId}-national-id`}
				label="Número de cédula"
				inputMode="numeric"
				autoComplete="off"
				placeholder="0912345678"
				error={errors.nationalId?.message}
				{...register("nationalId")}
			/>
			<div className="grid grid-cols-2 gap-2">
				<InputField
					id={`${formId}-first-name`}
					label="Nombres"
					autoComplete="off"
					placeholder="Juan"
					error={errors.firstName?.message}
					{...register("firstName")}
				/>
				<InputField
					id={`${formId}-last-name`}
					label="Apellidos"
					autoComplete="off"
					placeholder="Pérez"
					error={errors.lastName?.message}
					{...register("lastName")}
				/>
			</div>
			<InputField
				id={`${formId}-date-of-birth`}
				label="Fecha de nacimiento"
				type="date"
				error={errors.dateOfBirth?.message}
				{...register("dateOfBirth")}
			/>
			<div className="grid grid-cols-2 gap-2">
				<SelectField
					id={`${formId}-blood-type`}
					label="Tipo de sangre"
					options={BLOOD_TYPE_OPTIONS}
					error={errors.bloodType?.message}
					{...register("bloodType")}
				/>
				<SelectField
					id={`${formId}-gender`}
					label="Género"
					options={GENDER_OPTIONS}
					error={errors.gender?.message}
					{...register("gender")}
				/>
			</div>
			<InputField
				id={`${formId}-enrolment-number`}
				label="Número de matrícula"
				autoComplete="off"
				placeholder="STU-2024-001"
				error={errors.enrolmentNumber?.message}
				{...register("enrolmentNumber")}
			/>
			<FormActions
				submitLabel={submitLabel}
				isSubmitting={isSubmitting}
				onCancel={close}
			/>
		</form>
	);
}
