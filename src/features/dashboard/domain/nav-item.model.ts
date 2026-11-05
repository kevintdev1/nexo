export type NavItem = {
	name: string;
	path: string | null;
	children: NavItem[];
};
