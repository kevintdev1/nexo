const DIACRITICS = /\p{Diacritic}/gu;

export function normalizeText(text: string): string {
	return text.normalize("NFD").replace(DIACRITICS, "").toLowerCase().trim();
}
