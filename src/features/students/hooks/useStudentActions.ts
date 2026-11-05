import type { Student } from "../domain/student.model";
import { useDeleteStudent } from "./useDeleteStudent";

export type StudentActions = {
	edit: (student: Student) => void;
	remove: (student: Student) => void;
};

export function useStudentActions(
	edit: (student: Student) => void,
): StudentActions {
	const remove = useDeleteStudent();

	return { edit, remove };
}
