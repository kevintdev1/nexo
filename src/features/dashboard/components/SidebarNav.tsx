import type { NavItem } from "../domain/nav-item.model";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarNavLink } from "./SidebarNavLink";

type SidebarNavProps = {
	navItems: readonly NavItem[];
};

export function SidebarNav({ navItems }: SidebarNavProps) {
	return (
		<nav>
			<ul className="flex flex-col gap-4">
				{navItems.map((item) => (
					<li key={item.name}>
						{item.children.length > 0 ? (
							<SidebarNavGroup item={item} />
						) : (
							item.path && <SidebarNavLink name={item.name} path={item.path} />
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
