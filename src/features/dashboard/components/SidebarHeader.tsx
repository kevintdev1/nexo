import { BRAND } from "@shared/constants/brand";
import { ROUTES } from "@shared/constants/routes";
import { cn } from "@shared/utils/cn";
import { Link } from "react-router";
import { useSidebarState } from "../hooks/useSidebarState";

export function SidebarHeader() {
	const { isLabelVisible } = useSidebarState();

	return (
		<div
			className={cn(
				"mt-4 flex items-center gap-2",
				isLabelVisible ? "justify-start" : "justify-center",
			)}
		>
			<Link to={ROUTES.home}>
				<img src={BRAND.logoSrc} alt={BRAND.logoAlt} className="w-14" />
			</Link>
			{isLabelVisible && (
				<p className="font-semibold text-foreground">{BRAND.name}</p>
			)}
		</div>
	);
}
