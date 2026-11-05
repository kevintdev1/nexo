import { apiClient } from "@lib/api/api.client";
import { isBloodType, isGender, type Student } from "../domain/student.model";
import type { StudentsRepository } from "../domain/students.repository";
import type { StudentInput } from "../schemas/students.schema";

type StudentDto = {
	person_id: number | string;
	national_id_number: string;
	first_name: string;
	last_name: string;
	photo_url: string | null;
	date_of_birth: string | null;
	blood_type: string | null;
	gender: string | null;
	enrolment_num: string;
	is_deleted: boolean;
};

const ENDPOINTS = {
	students: "students/",
	student: (id: string) => `students/${id}`,
} as const;

function toStudent(dto: StudentDto): Student {
	return {
		id: String(dto.person_id),
		nationalId: dto.national_id_number,
		firstName: dto.first_name,
		lastName: dto.last_name,
		photoUrl: dto.photo_url,
		dateOfBirth: dto.date_of_birth,
		bloodType:
			dto.blood_type && isBloodType(dto.blood_type) ? dto.blood_type : null,
		gender: dto.gender && isGender(dto.gender) ? dto.gender : null,
		enrolmentNumber: dto.enrolment_num,
		isDeleted: dto.is_deleted,
	};
}

function toFormData({ photo, ...input }: StudentInput): FormData {
	const formData = new FormData();
	formData.append(
		"data",
		JSON.stringify({
			national_id_number: input.nationalId,
			first_name: input.firstName,
			last_name: input.lastName,
			date_of_birth: input.dateOfBirth,
			blood_type: input.bloodType,
			gender: input.gender,
			enrolment_num: input.enrolmentNumber,
		}),
	);
	if (photo) formData.append("photo", photo);
	return formData;
}

export class HttpStudentsRepository implements StudentsRepository {
	async list() {
		const dtos = await apiClient.get<StudentDto[]>(ENDPOINTS.students);
		return dtos.map(toStudent);
	}

	create(input: StudentInput) {
		return apiClient.post(ENDPOINTS.students, toFormData(input));
	}

	update(id: string, input: StudentInput) {
		return apiClient.put(ENDPOINTS.student(id), toFormData(input));
	}

	remove(id: string) {
		return apiClient.delete(ENDPOINTS.student(id));
	}
}
