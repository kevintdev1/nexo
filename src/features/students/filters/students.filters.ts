import { createEnumFilter } from "@shared/filters/enum.filter";
import type { Filter } from "@shared/filters/filter.types";
import { createTriStateFilter } from "@shared/filters/tri-state.filter";
import {
	BLOOD_TYPE_OPTIONS,
	GENDER_OPTIONS,
} from "../constants/student-options";
import type { Student } from "../domain/student.model";

export const STUDENT_FILTERS: readonly Filter<Student>[] = [
	createEnumFilter<Student>({
		key: "bloodType",
		label: "Tipo de sangre",
		options: BLOOD_TYPE_OPTIONS,
		getValue: (student) => student.bloodType,
	}),
	createEnumFilter<Student>({
		key: "gender",
		label: "Género",
		options: GENDER_OPTIONS,
		getValue: (student) => student.gender,
	}),
	createTriStateFilter<Student>({
		key: "deleted",
		label: "Estudiantes eliminados",
		labels: {
			exclude: "Ocultar eliminados",
			only: "Solo eliminados",
			all: "Todos",
		},
		getValue: (student) => student.isDeleted,
	}),
];

export function getStudentSearchText(student: Student): string {
	return `${student.firstName} ${student.lastName} ${student.nationalId} ${student.enrolmentNumber}`;
}
