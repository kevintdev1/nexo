import type { IconType } from "react-icons";
import {
	LuCalendarDays,
	LuCircleUser,
	LuLayoutGrid,
	LuSquareMenu,
	LuUniversity,
} from "react-icons/lu";

export const NAV_ICONS: Readonly<Record<string, IconType>> = {
	Inicio: LuLayoutGrid,
	Comunidad: LuCircleUser,
	"Instituciones educativas": LuUniversity,
	Torneos: LuCalendarDays,
};

export const FALLBACK_NAV_ICON: IconType = LuSquareMenu;
