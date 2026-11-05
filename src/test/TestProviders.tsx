import { ConfirmProvider } from "@shared/components/ConfirmProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { MemoryRouter } from "react-router";

type TestProvidersProps = {
	initialPath?: string;
	children: ReactNode;
};

export function TestProviders({
	initialPath = "/",
	children,
}: TestProvidersProps) {
	const [queryClient] = useState(
		() => new QueryClient({ defaultOptions: { queries: { retry: false } } }),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={[initialPath]}>
				<ConfirmProvider>{children}</ConfirmProvider>
			</MemoryRouter>
		</QueryClientProvider>
	);
}
