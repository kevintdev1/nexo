import { RequireSession } from "@features/auth/components/RequireSession";
import { DashboardShell } from "@features/dashboard/components/DashboardShell";
import { Spinner } from "@ui/Spinner";
import { Suspense } from "react";
import { Outlet } from "react-router";

export function DashboardLayout() {
	return (
		<RequireSession>
			{(session) => (
				<DashboardShell navItems={session.menu}>
					<Suspense
						fallback={
							<div className="flex justify-center p-10 text-primary">
								<Spinner />
							</div>
						}
					>
						<Outlet />
					</Suspense>
				</DashboardShell>
			)}
		</RequireSession>
	);
}
