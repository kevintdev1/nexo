import { createContext } from "react";
import type { StudentsService } from "./students.service";

export const StudentsServiceContext = createContext<StudentsService | null>(
	null,
);
