import { APP_LOCALE, APP_TIME_ZONE } from "@shared/constants/locale";

const ISO_DATE_PREFIX = /^(\d{4})-(\d{2})-(\d{2})/;

const longDateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
	dateStyle: "long",
	timeZone: "UTC",
});

const isoDateFormatter = new Intl.DateTimeFormat("en-CA", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	timeZone: APP_TIME_ZONE,
});

export function parseIsoDate(value: string): Date | null {
	const match = ISO_DATE_PREFIX.exec(value);
	if (!match) return null;

	const [, year, month, day] = match;
	return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

export function formatLongDate(value: string): string {
	const date = parseIsoDate(value);
	return date ? longDateFormatter.format(date) : "";
}

export function toIsoDate(date: Date): string {
	return isoDateFormatter.format(date);
}
