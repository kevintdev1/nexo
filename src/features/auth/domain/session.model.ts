export type MenuEntry = {
	name: string;
	path: string | null;
	children: MenuEntry[];
};

export type Session = {
	menu: MenuEntry[];
};
