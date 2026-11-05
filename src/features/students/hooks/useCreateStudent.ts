import { useOptimisticListMutation } from "@shared/hooks/useOptimisticListMutation";
import { appendItem } from "@shared/utils/list-updates";
import { createPendingId } from "@shared/utils/pending-id";
import { STUDENTS_QUERY_KEYS } from "../constants/students.query-keys";
import type { Student } from "../domain/student.model";
import type { StudentInput } from "../schemas/students.schema";
import { useStudentsService } from "./useStudentsService";

function toPendingStudent(input: StudentInput): Student {
	return {
		id: createPendingId(),
		nationalId: input.nationalId,
		firstName: input.firstName,
		lastName: input.lastName,
		photoUrl: null,
		dateOfBirth: input.dateOfBirth,
		bloodType: input.bloodType,
		gender: input.gender,
		enrolmentNumber: input.enrolmentNumber,
		isDeleted: false,
	};
}

export function useCreateStudent() {
	const studentsService = useStudentsService();

	return useOptimisticListMutation<Student, StudentInput>({
		queryKey: STUDENTS_QUERY_KEYS.list,
		mutationFn: (input) => studentsService.create(input),
		updateList: (students, input) =>
			appendItem(students, toPendingStudent(input)),
	});
}
