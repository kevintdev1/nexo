import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

HTMLDialogElement.prototype.showModal ??= function showModal(
	this: HTMLDialogElement,
) {
	this.open = true;
};

HTMLDialogElement.prototype.close ??= function close(this: HTMLDialogElement) {
	this.open = false;
	this.dispatchEvent(new Event("close"));
};

window.matchMedia ??= (query: string): MediaQueryList => ({
	matches: false,
	media: query,
	onchange: null,
	addEventListener: () => {},
	removeEventListener: () => {},
	addListener: () => {},
	removeListener: () => {},
	dispatchEvent: () => false,
});

afterEach(() => {
	cleanup();
});
