import { AuthServiceContext } from "@features/auth/services/auth.context";
import { InstitutionsServiceContext } from "@features/institutions/services/institutions.context";
import { StudentsServiceContext } from "@features/students/services/students.context";
import { UsersServiceContext } from "@features/users/services/users.context";
import { ConfirmProvider } from "@shared/components/ConfirmProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { services } from "./composition";
import { createQueryClient } from "./query-client";

type AppProvidersProps = {
	children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
	const [queryClient] = useState(createQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthServiceContext value={services.auth}>
				<InstitutionsServiceContext value={services.institutions}>
					<StudentsServiceContext value={services.students}>
						<UsersServiceContext value={services.users}>
							<BrowserRouter>
								<ConfirmProvider>{children}</ConfirmProvider>
							</BrowserRouter>
						</UsersServiceContext>
					</StudentsServiceContext>
				</InstitutionsServiceContext>
			</AuthServiceContext>
			<Toaster richColors position="top-right" />
		</QueryClientProvider>
	);
}
