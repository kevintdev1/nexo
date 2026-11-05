import { ApiError } from "@lib/api/api.errors";
import { ROUTES } from "@shared/constants/routes";
import { TestProviders } from "@test/TestProviders";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router";
import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import type { AuthRepository } from "../domain/auth.repository";
import { AuthServiceContext } from "../services/auth.context";
import { AuthService } from "../services/auth.service";
import { LoginForm } from "./LoginForm";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

function renderLoginForm(repository: AuthRepository) {
	render(
		<TestProviders initialPath={ROUTES.login}>
			<AuthServiceContext value={new AuthService(repository)}>
				<Routes>
					<Route path={ROUTES.login} element={<LoginForm />} />
					<Route path={ROUTES.dashboard} element={<p>Panel</p>} />
				</Routes>
			</AuthServiceContext>
		</TestProviders>,
	);
}

function createRepository(login: AuthRepository["login"]): AuthRepository {
	return { getSession: vi.fn(async () => null), login };
}

describe("LoginForm", () => {
	it("shows validation errors and does not submit empty credentials", async () => {
		const user = userEvent.setup();
		const login = vi.fn<AuthRepository["login"]>();
		renderLoginForm(createRepository(login));

		await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

		expect(
			await screen.findByText("El correo es un campo obligatorio."),
		).toBeInTheDocument();
		expect(
			screen.getByText("La contraseña es obligatoria."),
		).toBeInTheDocument();
		expect(login).not.toHaveBeenCalled();
	});

	it("logs in and navigates to the dashboard", async () => {
		const user = userEvent.setup();
		const login = vi.fn<AuthRepository["login"]>(async () => ({ menu: [] }));
		renderLoginForm(createRepository(login));

		await user.type(
			screen.getByLabelText("Correo electrónico"),
			"ana@example.com",
		);
		await user.type(screen.getByLabelText("Contraseña"), "secret");
		await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

		expect(await screen.findByText("Panel")).toBeInTheDocument();
		expect(login).toHaveBeenCalledWith({
			email: "ana@example.com",
			password: "secret",
		});
	});

	it("shows the backend message when the login fails", async () => {
		const user = userEvent.setup();
		const login = vi.fn<AuthRepository["login"]>(async () => {
			throw new ApiError(401, "INVALID_CREDENTIALS", "Credenciales inválidas.");
		});
		renderLoginForm(createRepository(login));

		await user.type(
			screen.getByLabelText("Correo electrónico"),
			"ana@example.com",
		);
		await user.type(screen.getByLabelText("Contraseña"), "wrong");
		await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

		await vi.waitFor(() =>
			expect(toast.error).toHaveBeenCalledWith("Credenciales inválidas."),
		);
		expect(screen.queryByText("Panel")).not.toBeInTheDocument();
	});
});
