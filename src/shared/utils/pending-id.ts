const PENDING_ID_PREFIX = "pending-";

export function createPendingId(): string {
	const suffix =
		typeof crypto.randomUUID === "function"
			? crypto.randomUUID()
			: `${Date.now()}-${Math.random().toString(36).slice(2)}`;
	return `${PENDING_ID_PREFIX}${suffix}`;
}

export function isPendingId(id: string): boolean {
	return id.startsWith(PENDING_ID_PREFIX);
}
