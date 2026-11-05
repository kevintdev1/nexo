import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { patchItem } from "@shared/utils/list-updates";
import { STUDENTS_QUERY_KEYS } from "../constants/students.query-keys";
import type { Student } from "../domain/student.model";
import type { StudentInput } from "../schemas/students.schema";
import { useStudentsService } from "./useStudentsService";

type UpdateStudentVariables = {
	id: string;
	input: StudentInput;
};

export function useUpdateStudent() {
	const studentsService = useStudentsService();

	return useOptimisticListMutation<Student, UpdateStudentVariables>({
		queryKey: STUDENTS_QUERY_KEYS.list,
		mutationFn: ({ id, input }) => studentsService.update(id, input),
		updateList: (students, { id, input: { photo: _photo, ...fields } }) =>
			patchItem(students, id, fields),
	});
}
