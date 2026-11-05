import { BRAND } from "@shared/constants/brand";
import { ROUTES } from "@shared/constants/routes";
import { TextLink } from "@ui/TextLink";
import { Link } from "react-router";
import { HOME_NAV_LINKS } from "../constants/home-navigation";

export function HomeNavBar() {
	return (
		<nav
			aria-label="Navegación del sitio"
			className="flex items-center justify-between border-inverse border-b p-2 text-inverse"
		>
			<Link to={ROUTES.home}>
				<img src={BRAND.logoSrc} alt={BRAND.logoAlt} className="w-14" />
			</Link>
			<ul className="flex gap-x-6 font-medium">
				{HOME_NAV_LINKS.map((link) => (
					<li key={link.path}>
						<TextLink to={link.path}>{link.label}</TextLink>
					</li>
				))}
			</ul>
			<TextLink to={ROUTES.login} className="px-4 py-2">
				Iniciar sesión
			</TextLink>
		</nav>
	);
}
