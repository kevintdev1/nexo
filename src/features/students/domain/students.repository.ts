import type { StudentInput } from "../schemas/students.schema";
import type { Student } from "./student.model";

export interface StudentsRepository {
	list(): Promise<Student[]>;
	create(input: StudentInput): Promise<void>;
	update(id: string, input: StudentInput): Promise<void>;
	remove(id: string): Promise<void>;
}
