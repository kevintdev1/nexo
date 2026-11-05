import { parseIsoDate } from "./format-date";

export function calculateAge(
	birthDate: string,
	today = new Date(),
): number | null {
	const date = parseIsoDate(birthDate);
	if (!date) return null;

	const years = today.getFullYear() - date.getUTCFullYear();
	const monthDifference = today.getMonth() - date.getUTCMonth();
	const hasHadBirthday =
		monthDifference > 0 ||
		(monthDifference === 0 && today.getDate() >= date.getUTCDate());

	return hasHadBirthday ? years : years - 1;
}
