import { SidebarToggleButton } from "./SidebarToggleButton";

export function DashboardHeader() {
	return (
		<header className="sticky top-0 z-10 flex w-full items-center border-border bg-surface px-5 py-3 lg:border-b">
			<SidebarToggleButton />
		</header>
	);
}
