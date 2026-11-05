import { Modal } from "@ui/Modal";
import { useCreateStudentForm } from "../hooks/useCreateStudentForm";
import { StudentForm } from "./StudentForm";

type CreateStudentModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function CreateStudentModal({
	isOpen,
	onClose,
}: CreateStudentModalProps) {
	const controller = useCreateStudentForm(onClose);

	return (
		<Modal
			isOpen={isOpen}
			onClose={controller.close}
			title="Registrar estudiante"
			description="Registra un nuevo estudiante en el sistema."
		>
			<StudentForm controller={controller} submitLabel="Registrar" />
		</Modal>
	);
}
