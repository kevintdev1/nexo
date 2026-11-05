import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { getStudentFullName } from "../domain/student.model";
import type { StudentInput } from "../schemas/students.schema";
import { useCreateStudent } from "./useCreateStudent";
import { useStudentForm } from "./useStudentForm";

const EMPTY_STUDENT = {
	photo: undefined,
	nationalId: "",
	firstName: "",
	lastName: "",
	dateOfBirth: "",
	bloodType: "",
	gender: "",
	enrolmentNumber: "",
};

export function useCreateStudentForm(onDone: () => void) {
	const { mutateAsync } = useCreateStudent();

	const createStudent = useConfirmedMutation({
		mutate: mutateAsync,
		getConfirmation: (input: StudentInput) => ({
			title: "¿Registrar estudiante?",
			description: `Se registrará a ${getStudentFullName(input)} en el sistema.`,
			confirmLabel: "Sí, registrar",
		}),
		messages: {
			loading: "Registrando estudiante…",
			success: "Estudiante registrado con éxito.",
			error: "No se pudo registrar el estudiante.",
		},
	});

	return useStudentForm({
		defaultValues: EMPTY_STUDENT,
		submit: createStudent,
		onDone,
	});
}
