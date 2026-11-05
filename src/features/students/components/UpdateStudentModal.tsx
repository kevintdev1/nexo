import { Modal } from "@ui/Modal";
import type { Student } from "../domain/student.model";
import { useUpdateStudentForm } from "../hooks/useUpdateStudentForm";
import { StudentForm } from "./StudentForm";

type UpdateStudentModalProps = {
	student: Student;
	onClose: () => void;
};

export function UpdateStudentModal({
	student,
	onClose,
}: UpdateStudentModalProps) {
	const controller = useUpdateStudentForm(student, onClose);

	return (
		<Modal
			isOpen
			onClose={controller.close}
			title="Editar estudiante"
			description="Actualiza los datos del estudiante."
		>
			<StudentForm controller={controller} submitLabel="Actualizar" />
		</Modal>
	);
}
