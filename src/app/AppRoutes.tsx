import { ROUTES } from "@shared/constants/routes";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const DashboardHomePage = lazy(async () => ({
	default: (await import("./pages/DashboardHomePage")).DashboardHomePage,
}));
const UsersPage = lazy(async () => ({
	default: (await import("./pages/UsersPage")).UsersPage,
}));
const StudentsPage = lazy(async () => ({
	default: (await import("./pages/StudentsPage")).StudentsPage,
}));
const InstitutionsPage = lazy(async () => ({
	default: (await import("./pages/InstitutionsPage")).InstitutionsPage,
}));

export function AppRoutes() {
	return (
		<Routes>
			<Route path={ROUTES.home} element={<HomePage />} />
			<Route path={ROUTES.login} element={<LoginPage />} />
			<Route element={<DashboardLayout />}>
				<Route path={ROUTES.dashboard} element={<DashboardHomePage />} />
				<Route path={ROUTES.users} element={<UsersPage />} />
				<Route path={ROUTES.students} element={<StudentsPage />} />
				<Route path={ROUTES.institutions} element={<InstitutionsPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
