import type { Student } from "../domain/student.model";
import type { StudentsRepository } from "../domain/students.repository";
import type { StudentInput } from "../schemas/students.schema";

export class StudentsService {
	constructor(private readonly repository: StudentsRepository) {}

	list(): Promise<Student[]> {
		return this.repository.list();
	}

	create(input: StudentInput): Promise<void> {
		return this.repository.create(input);
	}

	update(id: string, input: StudentInput): Promise<void> {
		return this.repository.update(id, input);
	}

	remove(id: string): Promise<void> {
		return this.repository.remove(id);
	}
}
