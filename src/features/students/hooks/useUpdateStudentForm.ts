import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { getStudentFullName, type Student } from "../domain/student.model";
import type { StudentInput } from "../schemas/students.schema";
import { useStudentForm } from "./useStudentForm";
import { useUpdateStudent } from "./useUpdateStudent";

export function useUpdateStudentForm(student: Student, onDone: () => void) {
	const { mutateAsync } = useUpdateStudent();

	const updateStudent = useConfirmedMutation({
		mutate: (input: StudentInput) => mutateAsync({ id: student.id, input }),
		getConfirmation: (input) => ({
			title: "¿Actualizar estudiante?",
			description: `Se actualizarán los datos de ${getStudentFullName(input)}.`,
			confirmLabel: "Sí, actualizar",
		}),
		messages: {
			loading: "Actualizando estudiante…",
			success: "Estudiante actualizado con éxito.",
			error: "No se pudo actualizar el estudiante.",
		},
	});

	return useStudentForm({
		defaultValues: {
			photo: undefined,
			nationalId: student.nationalId,
			firstName: student.firstName,
			lastName: student.lastName,
			dateOfBirth: student.dateOfBirth ?? "",
			bloodType: student.bloodType ?? "",
			gender: student.gender ?? "",
			enrolmentNumber: student.enrolmentNumber,
		},
		submit: updateStudent,
		onDone,
	});
}
