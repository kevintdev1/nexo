export const BLOOD_TYPES = [
	"O+",
	"O-",
	"A+",
	"A-",
	"B+",
	"B-",
	"AB+",
	"AB-",
] as const;
export const GENDERS = ["M", "F", "O"] as const;

export type BloodType = (typeof BLOOD_TYPES)[number];
export type Gender = (typeof GENDERS)[number];

export type Student = {
	id: string;
	nationalId: string;
	firstName: string;
	lastName: string;
	photoUrl: string | null;
	dateOfBirth: string | null;
	bloodType: BloodType | null;
	gender: Gender | null;
	enrolmentNumber: string;
	isDeleted: boolean;
};

export function isBloodType(value: string): value is BloodType {
	return BLOOD_TYPES.some((bloodType) => bloodType === value);
}

export function isGender(value: string): value is Gender {
	return GENDERS.some((gender) => gender === value);
}

export function getStudentFullName(
	student: Pick<Student, "firstName" | "lastName">,
): string {
	return `${student.firstName} ${student.lastName}`;
}
