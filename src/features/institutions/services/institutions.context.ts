import { createContext } from "react";
import type { InstitutionsService } from "./institutions.service";

export const InstitutionsServiceContext =
	createContext<InstitutionsService | null>(null);
