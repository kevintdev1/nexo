import { apiClient } from "@lib/api/api.client";
import { ApiError } from "@lib/api/api.errors";
import { ROUTES } from "@shared/constants/routes";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

vi.mock("@lib/api/api.client", () => ({
	apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

function visit(path: string) {
	window.history.pushState({}, "", path);
	render(<App />);
}

describe("App", () => {
	beforeEach(() => {
		vi.mocked(apiClient.get).mockReset();
	});

	it("renders the public home page", async () => {
		visit(ROUTES.home);

		expect(
			await screen.findByRole("link", { name: "Iniciar sesión" }),
		).toBeInTheDocument();
	});

	it("redirects to the login page when there is no session", async () => {
		vi.mocked(apiClient.get).mockRejectedValue(
			new ApiError(401, "UNAUTHORIZED", "No autorizado"),
		);
		visit(ROUTES.dashboard);

		expect(
			await screen.findByRole("heading", { name: "Inicio de sesión" }),
		).toBeInTheDocument();
	});

	it("renders the dashboard with the session menu", async () => {
		vi.mocked(apiClient.get).mockResolvedValue({
			session: { menu: [{ name: "Inicio", path: ROUTES.dashboard }] },
		});
		visit(ROUTES.dashboard);

		expect(
			await screen.findByRole("link", { name: "Inicio" }),
		).toBeInTheDocument();
		expect(
			await screen.findByText("Selecciona una opción del menú para comenzar."),
		).toBeInTheDocument();
	});
});
