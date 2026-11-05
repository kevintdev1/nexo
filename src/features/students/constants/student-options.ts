import { BLOOD_TYPES, GENDERS, type Gender } from "../domain/student.model";

export const GENDER_LABELS: Readonly<Record<Gender, string>> = {
	M: "Masculino",
	F: "Femenino",
	O: "Otro",
};

export const GENDER_OPTIONS = GENDERS.map((gender) => ({
	value: gender,
	label: GENDER_LABELS[gender],
}));

export const BLOOD_TYPE_OPTIONS = BLOOD_TYPES.map((bloodType) => ({
	value: bloodType,
	label: bloodType,
}));
