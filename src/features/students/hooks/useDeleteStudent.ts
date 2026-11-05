import { useConfirmedMutation } from "@shared/hooks/useConfirmedMutation";
import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { removeItem } from "@shared/utils/list-updates";
import { STUDENTS_QUERY_KEYS } from "../constants/students.query-keys";
import { getStudentFullName, type Student } from "../domain/student.model";
import { useStudentsService } from "./useStudentsService";

export function useDeleteStudent() {
	const studentsService = useStudentsService();
	const { mutateAsync } = useOptimisticListMutation<Student, Student>({
		queryKey: STUDENTS_QUERY_KEYS.list,
		mutationFn: (student) => studentsService.remove(student.id),
		updateList: (students, student) => removeItem(students, student.id),
	});

	return useConfirmedMutation({
		mutate: mutateAsync,
		getConfirmation: (student: Student) => ({
			title: "¿Eliminar estudiante?",
			description: `Se eliminará a ${getStudentFullName(student)} del sistema.`,
			confirmLabel: "Sí, eliminar",
			tone: "danger",
		}),
		messages: {
			loading: "Eliminando estudiante…",
			success: "Estudiante eliminado con éxito.",
			error: "No se pudo eliminar el estudiante.",
		},
	});
}
