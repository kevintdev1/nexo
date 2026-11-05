import { useQuery } from "@tanstack/react-query";
import { STUDENTS_QUERY_KEYS } from "../constants/students.query-keys";
import type { Student } from "../domain/student.model";
import { useStudentsService } from "./useStudentsService";

const NO_STUDENTS: Student[] = [];

export function useStudents() {
	const studentsService = useStudentsService();
	const { data, isPending } = useQuery({
		queryKey: STUDENTS_QUERY_KEYS.list,
		queryFn: () => studentsService.list(),
	});

	return { students: data ?? NO_STUDENTS, isLoading: isPending };
}
